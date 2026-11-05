import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const migrations = [];
for (const entry of await readdir(new URL('../supabase/migrations/', import.meta.url), { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.sql')) migrations.push(await readFile(new URL(`../supabase/migrations/${entry.name}`, import.meta.url), 'utf8'));
}
const sql = migrations.join('\n');
const tables = [...sql.matchAll(/create table(?: if not exists)? public\.([a-z0-9_]+)/giu)].map((match) => match[1].toLowerCase());
const rlsTables = [...sql.matchAll(/alter table public\.([a-z0-9_]+) enable row level security/giu)].map((match) => match[1].toLowerCase());

test('chaque table métier publique possède RLS dans l’historique local', () => {
  const uniqueTables = [...new Set(tables)].sort();
  const uniqueRlsTables = [...new Set(rlsTables)].sort();
  assert.equal(uniqueTables.length, 25);
  assert.deepEqual(uniqueRlsTables, uniqueTables);
});

test('les tables opérationnelles sensibles n’ont pas de lecture publique implicite', () => {
  for (const table of [
    'orders', 'order_items', 'order_notification_outbox', 'email_delivery_attempts',
    'invoice_documents', 'newsletter_subscribers', 'newsletter_campaigns',
    'newsletter_deliveries', 'newsletter_delivery_attempts', 'newsletter_suppressions',
    'newsletter_provider_events', 'document_generation_jobs', 'order_address_changes',
  ]) {
    const tableBlock = sql.match(new RegExp(`(?:create policy|revoke)[\\s\\S]{0,240}public\\.${table}`, 'iu'));
    assert.ok(tableBlock || new RegExp(`${table}[^\\n]{0,180}(?:no_public|public_deny|owner_read|customer_read)`, 'iu').test(sql), `aucun garde-fou local repéré pour ${table}`);
  }
  assert.match(sql, /revoke all on table public\.order_notification_outbox from public, anon, authenticated/i);
  assert.match(sql, /create policy order_idempotency_no_public_access[\s\S]*?using \(false\)[\s\S]*?with check \(false\)/i);
});
