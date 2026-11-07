import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

const [initialMigration, factsMigration, labelsMigration] = await Promise.all([
  readFile(new URL('../backend/cloudflare-d1/migrations/0001_initial_schema.sql', import.meta.url), 'utf8'),
  readFile(new URL('../backend/cloudflare-d1/migrations/0002_advisor_facts.sql', import.meta.url), 'utf8'),
  readFile(new URL('../backend/cloudflare-d1/migrations/0003_advisor_labels.sql', import.meta.url), 'utf8'),
]);

test('CRO-220 définit des tables de labels versionnées et sourcées', () => {
  for (const table of ['lexicon_terms', 'attribute_evidence', 'badge_rules', 'badge_assignments']) {
    assert.match(labelsMigration, new RegExp(`CREATE TABLE IF NOT EXISTS ${table}`, 'u'));
  }
  assert.match(labelsMigration, /source_id TEXT REFERENCES fact_sources/u);
  assert.match(labelsMigration, /version TEXT NOT NULL/u);
  assert.match(labelsMigration, /status TEXT NOT NULL/u);
  assert.match(labelsMigration, /published_as/u);
  assert.match(labelsMigration, /INSERT OR IGNORE INTO schema_migrations\(version\) VALUES \('0003_advisor_labels'\)/u);
  assert.doesNotMatch(labelsMigration, /customer|payment|order|visitor|profile/iu);
});

test('CRO-220 se rejoue dans SQLite sans doublons et garde une provenance publiable', () => {
  const db = new DatabaseSync(':memory:');
  db.exec(initialMigration);
  db.exec(factsMigration);
  db.exec(labelsMigration);
  db.exec(labelsMigration);
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('lexicon_terms', 'attribute_evidence', 'badge_rules', 'badge_assignments') ORDER BY name").all().map((row) => row.name);
  assert.deepEqual(tables, ['attribute_evidence', 'badge_assignments', 'badge_rules', 'lexicon_terms']);
  assert.deepEqual(db.prepare('SELECT version FROM schema_migrations ORDER BY version').all().map((row) => row.version), [
    '0001_initial_schema', '0002_advisor_facts', '0003_advisor_labels',
  ]);
  db.exec("INSERT INTO fact_sources (id, source_kind, source_ref) VALUES ('src-1', 'owner-approved', 'demo-fiche-1')");
  db.exec("INSERT INTO lexicon_terms (id, namespace, canonical_term, term, normalized_term, version, source_id, status, published_as) VALUES ('term-1', 'notes', 'fruite', 'fruité', 'fruite', '2026-11-07.1', 'src-1', 'verified', 'demo')");
  assert.equal(db.prepare('SELECT published_as FROM lexicon_terms WHERE id = ?').get('term-1').published_as, 'demo');
});
