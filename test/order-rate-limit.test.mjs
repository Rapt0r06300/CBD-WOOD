import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../supabase/functions/create-pending-order/index.ts', import.meta.url), 'utf8');
const migration = await readFile(new URL('../supabase/migrations/20261105130000_order_rate_limit.sql', import.meta.url), 'utf8');
const rlsMigration = await readFile(new URL('../supabase/migrations/20261105232000_rate_limit_rls.sql', import.meta.url), 'utf8');
const securityGate = await readFile(new URL('../docs/ops/supabase-security-gate.md', import.meta.url), 'utf8');

test('la création de commande utilise une limite serveur et ne stocke pas l’IP brute', () => {
  assert.match(source, /consume_order_rate_limit/);
  assert.match(source, /crypto\.subtle\.digest/);
  assert.match(source, /Retry-After/);
  assert.doesNotMatch(source, /insert\([^\n]*CF-Connecting-IP/i);
});

test('la limite serveur est réservée à la fonction de commande', () => {
  assert.match(migration, /create schema if not exists private/);
  assert.match(migration, /create table if not exists private\.order_rate_limit_buckets/);
  assert.match(migration, /create or replace function public\.consume_order_rate_limit/);
  assert.match(migration, /revoke all on function public\.consume_order_rate_limit/);
  assert.match(migration, /grant execute on function public\.consume_order_rate_limit\(text, integer, integer\) to service_role/);
  assert.match(rlsMigration, /alter table private\.order_rate_limit_buckets enable row level security/i);
  assert.match(rlsMigration, /revoke all on table private\.order_rate_limit_buckets from public, anon, authenticated/i);
  assert.match(securityGate, /Tant que cette preuve distante n’existe pas, la porte de production reste fermée/i);
  assert.match(securityGate, /Leaked Password Protection/i);
});
