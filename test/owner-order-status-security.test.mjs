import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(new URL('../supabase/migrations/20261105250000_owner_order_status_rpc.sql', import.meta.url), 'utf8');
const ownerSource = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');

test('les changements de statut propriétaire sont validés, verrouillés et journalisés', () => {
  assert.match(migration, /create table if not exists public\.order_status_changes/);
  assert.match(migration, /actor_id uuid not null references auth\.users\(id\)/);
  assert.match(migration, /create or replace function public\.owner_update_order_status/);
  assert.match(migration, /security definer[\s\S]*?set search_path = public/);
  assert.match(migration, /from public\.orders[\s\S]*?for update/);
  assert.match(migration, /Transition de commande non autorisée/);
  assert.match(migration, /insert into public\.order_status_changes/);
  assert.match(migration, /create table if not exists public\.order_stock_releases/);
  assert.match(migration, /order_id uuid not null unique references public\.orders\(id\)/);
  assert.match(migration, /create or replace function public\.release_order_stock/);
  assert.match(migration, /stock_quantity = stock_quantity \+ v_item\.quantity/);
  assert.match(migration, /grant execute on function public\.release_order_stock\(uuid, uuid, text\) to service_role/);
  assert.match(migration, /grant execute on function public\.owner_update_order_status\(uuid, text, text\) to authenticated/);
});

test('le tableau de bord passe par la fonction contrôlée et demande un motif pour annuler', () => {
  assert.match(ownerSource, /const orderTransitions = \{/);
  assert.match(ownerSource, /pending: \['pending', 'cancelled'\]/);
  assert.match(ownerSource, /allowedStatuses\.has\(status\)[\s\S]*?statusLabels\[status\]/);
  assert.match(ownerSource, /supabase\.rpc\('owner_update_order_status'/);
  assert.match(ownerSource, /window\.prompt\('Pourquoi cette commande est-elle annulée \?'/);
  assert.match(ownerSource, /p_order_id: id/);
  assert.match(ownerSource, /p_next_status: status/);
  assert.doesNotMatch(ownerSource, /supabase\.from\(['"]orders['"]\)\.update\(\{ status \}\)/);
});
