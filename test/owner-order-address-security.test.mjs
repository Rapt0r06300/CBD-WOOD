import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(new URL('../supabase/migrations/20261105260000_owner_order_address_correction.sql', import.meta.url), 'utf8');
const dashboard = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');
const html = await readFile(new URL('../compte.html', import.meta.url), 'utf8');

test('la correction d’adresse est owner-only, verrouillée et journalisée', () => {
  assert.match(migration, /create table if not exists public\.order_address_changes/);
  assert.match(migration, /create or replace function public\.owner_update_order_address/);
  assert.match(migration, /security definer/);
  assert.match(migration, /where id = p_order_id\s+for update/is);
  assert.match(migration, /owner_users/);
  assert.match(migration, /insert into public\.order_address_changes/);
  assert.match(migration, /update public\.orders\s+set delivery_address = v_next_address/is);
  assert.match(migration, /revoke all on function public\.owner_update_order_address\(uuid, text, text\) from public, anon/);
  assert.match(migration, /grant execute on function public\.owner_update_order_address\(uuid, text, text\) to authenticated/);
  assert.doesNotMatch(migration, /grant execute on function public\.owner_update_order_address[^;]+service_role/i);
});

test('le tableau de bord propose une correction contrôlée sans écriture directe sur orders', () => {
  assert.match(html, /ownerAddressDialog/);
  assert.match(html, /ownerAddressReason/);
  assert.match(dashboard, /data-owner-edit-address/);
  assert.match(dashboard, /owner_update_order_address/);
  assert.doesNotMatch(dashboard, /supabase\.from\(['"]orders['"]\)\.update/);
});
