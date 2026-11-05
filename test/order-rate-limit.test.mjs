import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../supabase/functions/create-pending-order/index.ts', import.meta.url), 'utf8');
const migration = await readFile(new URL('../supabase/migrations/20261105130000_order_rate_limit.sql', import.meta.url), 'utf8');

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
});
