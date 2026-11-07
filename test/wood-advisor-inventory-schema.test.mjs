import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { collectAdvisorInventory } from '../scripts/inventory-wood-advisor.mjs';

const [initialMigration, migration] = await Promise.all([
  readFile(new URL('../backend/cloudflare-d1/migrations/0001_initial_schema.sql', import.meta.url), 'utf8'),
  readFile(new URL('../backend/cloudflare-d1/migrations/0002_advisor_facts.sql', import.meta.url), 'utf8'),
]);

test('l’inventaire WOOD est idempotent, dédupliqué et limité aux sources publiques locales', async () => {
  const first = await collectAdvisorInventory();
  const second = await collectAdvisorInventory();
  assert.deepEqual(first, second);
  assert.equal(first.length, 22);
  assert.equal(new Set(first.map((item) => item.slug)).size, first.length);
  assert.ok(first.every((item) => item.sourceFile && item.name && item.category && Array.isArray(item.media) && Array.isArray(item.variants)));
  assert.ok(first.some((item) => item.name === 'Nimbus 3000' && item.variants.length === 5));
  assert.ok(first.every((item) => !JSON.stringify(item).match(/customer|order|payment|supabase/i)));
});

test('la migration advisor D1 est additive, idempotente et sans profil visiteur', () => {
  for (const table of ['product_facts', 'fact_sources', 'normalized_values', 'question_rules', 'import_runs', 'review_queue']) {
    assert.match(migration, new RegExp(`CREATE TABLE IF NOT EXISTS ${table}`, 'u'));
  }
  assert.match(migration, /INSERT OR IGNORE INTO schema_migrations\(version\) VALUES \('0002_advisor_facts'\)/u);
  assert.doesNotMatch(migration, /visitor|profile|customer|session/i);
  assert.match(migration, /verified|needs_review|unknown/iu);
});

test('la migration advisor se rejoue sans dupliquer les tables ni les versions', () => {
  const db = new DatabaseSync(':memory:');
  db.exec(initialMigration);
  db.exec(migration);
  db.exec(migration);
  const versions = db.prepare('SELECT version FROM schema_migrations ORDER BY version').all().map((row) => row.version);
  assert.deepEqual(versions, ['0001_initial_schema', '0002_advisor_facts']);
  const advisorTables = db.prepare("SELECT COUNT(*) AS count FROM sqlite_master WHERE type = 'table' AND name IN ('product_facts', 'fact_sources', 'normalized_values', 'question_rules', 'import_runs', 'review_queue')").get().count;
  assert.equal(advisorTables, 6);
});
