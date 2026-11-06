import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const contract = await readFile(new URL('../docs/design/wood-supabase-data-contract.md', import.meta.url), 'utf8');
const base = await readFile(new URL('../supabase/migrations/20261103164147_woodshop_backend.sql', import.meta.url), 'utf8');
const hardening = await readFile(new URL('../supabase/migrations/20261104120000_order_security_and_stock.sql', import.meta.url), 'utf8');
const roles = await readFile(new URL('../supabase/migrations/20261104130000_customer_account_roles.sql', import.meta.url), 'utf8');
const history = await readFile(new URL('../supabase/migrations/20261104150000_order_status_history.sql', import.meta.url), 'utf8');
const statusRpc = await readFile(new URL('../supabase/migrations/20261105250000_owner_order_status_rpc.sql', import.meta.url), 'utf8');

test('le contrat nomme les tables métier et leurs sources de vérité', () => {
  assert.match(contract, /Périmètre des tables et contrats/iu);
  for (const table of ['products', 'product_prices', 'customer_profiles', 'owner_users', 'orders', 'order_items']) {
    assert.match(contract, new RegExp(`\\b${table}\\b`, 'iu'));
  }
  assert.match(base, /create table if not exists public\.products/);
  assert.match(base, /create table if not exists public\.owner_users/);
  assert.match(base, /create table if not exists public\.customer_profiles/);
  assert.match(base, /create table if not exists public\.orders/);
  assert.match(base, /create table if not exists public\.order_items/);
});

test('le contrat couvre intégrité, snapshots, idempotence et stock atomique', () => {
  assert.match(contract, /Intégrité, snapshots et idempotence/iu);
  assert.match(base, /stock_quantity integer not null default 0 check \(stock_quantity >= 0\)/);
  assert.match(base, /status text not null default 'pending'/);
  assert.match(hardening, /create table if not exists public\.order_idempotency_keys/);
  assert.match(hardening, /on conflict \(idempotency_key\) do nothing/);
  assert.match(hardening, /for update/);
  assert.match(hardening, /update public\.products[\s\S]*?stock_quantity = stock_quantity - v_quantity/);
  assert.match(hardening, /revoke execute on function public\.create_pending_order\(jsonb\) from public, anon, authenticated/);
  assert.match(history, /create table if not exists public\.order_status_history/);
  assert.match(history, /create trigger orders_record_status_history/);
});

test('le contrat relie RLS, rôle client, owner et historique append-only', () => {
  assert.match(contract, /RLS, rôles et historique append-only/iu);
  assert.match(base, /alter table public\.products enable row level security/);
  assert.match(base, /alter table public\.orders enable row level security/);
  assert.match(base, /create policy products_owner_update[\s\S]*?owner_users\.user_id = \(select auth\.uid\(\)\)/);
  assert.match(base, /create policy orders_customer_read_own[\s\S]*?customer_id = \(select auth\.uid\(\)\)/);
  assert.match(base, /create policy order_items_customer_read[\s\S]*?orders\.customer_id = \(select auth\.uid\(\)\)/);
  assert.match(roles, /account_role text not null default 'customer'/i);
  assert.match(roles, /check \(account_role = 'customer'\)/i);
  assert.match(statusRpc, /revoke update on table public\.orders from authenticated/);
  assert.match(statusRpc, /owner_users/);
});

test('le contrat documente évolution additive, preuve, fallback et rollback', () => {
  assert.match(contract, /Évolution additive, preuve et rollback/iu);
  assert.match(contract, /absence|erreur|donnée manquante/iu);
  assert.match(contract, /migrations|restauration|legacy/iu);
  assert.match(contract, /Supabase production|projet de test/iu);
  assert.match(roles, /on conflict \(id\) do nothing/iu);
  assert.match(history, /revoke all on table public\.order_status_history from public, anon, authenticated/);
});
