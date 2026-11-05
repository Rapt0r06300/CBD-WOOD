import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const baseMigration = await readFile(new URL('../supabase/migrations/20261103164147_woodshop_backend.sql', import.meta.url), 'utf8');
const hardeningMigration = await readFile(new URL('../supabase/migrations/20261104120000_order_security_and_stock.sql', import.meta.url), 'utf8');
const roleMigration = await readFile(new URL('../supabase/migrations/20261104130000_customer_account_roles.sql', import.meta.url), 'utf8');

test('les politiques RLS refusent à un client la lecture d’une autre commande', () => {
  assert.match(baseMigration, /create policy orders_customer_read_own[\s\S]*?to authenticated[\s\S]*?customer_id = \(select auth\.uid\(\)\)/);
  assert.match(baseMigration, /create policy order_items_customer_read[\s\S]*?orders\.customer_id = \(select auth\.uid\(\)\)/);
  assert.match(baseMigration, /create policy orders_owner_update[\s\S]*?owner_users\.user_id = \(select auth\.uid\(\)\)/);
});

test('les écritures de stock et d’idempotence ne sont pas ouvertes aux clients', () => {
  assert.match(baseMigration, /create policy products_owner_update[\s\S]*?owner_users\.user_id = \(select auth\.uid\(\)\)/);
  assert.match(hardeningMigration, /revoke all on table public\.order_idempotency_keys from public, anon, authenticated/);
  assert.match(hardeningMigration, /create policy order_idempotency_no_public_access[\s\S]*?using \(false\)[\s\S]*?with check \(false\)/);
  assert.match(hardeningMigration, /revoke execute on function public\.create_pending_order\(jsonb\) from public, anon, authenticated/);
});

test('le rôle client ne peut pas s’attribuer le rôle propriétaire', () => {
  assert.match(roleMigration, /create or replace function public\.handle_new_user\(\)[\s\S]*?security definer/);
  assert.match(roleMigration, /insert into public\.customer_profiles[\s\S]*?role\)/);
  assert.match(roleMigration, /check \(account_role = 'customer'\)/);
  assert.doesNotMatch(roleMigration, /grant .*owner_users/i);
});
