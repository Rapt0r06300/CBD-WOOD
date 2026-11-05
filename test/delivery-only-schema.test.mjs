import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('la migration finale verrouille la livraison sans supprimer brutalement l’historique', async () => {
  const migration = await readFile(new URL('../supabase/migrations/20261105230000_delivery_only_schema_guard.sql', import.meta.url), 'utf8');

  assert.match(migration, /where fulfillment_mode <> 'delivery'/);
  assert.match(migration, /where pickup_code is not null/);
  assert.match(migration, /orders_fulfillment_mode_delivery_check/);
  assert.match(migration, /check \(fulfillment_mode = 'delivery'\)/);
  assert.match(migration, /orders_pickup_code_delivery_check/);
  assert.match(migration, /check \(pickup_code is null\)/);
  assert.match(migration, /drop index if exists public\.orders_pickup_code_uidx/);
  assert.match(migration, /does not delete the nullable[\s\S]*legacy pickup_code column/);
});
