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

test('la fonction de commande active est livraison-only et ne renvoie pas le retrait', async () => {
  const migration = await readFile(new URL('../supabase/migrations/20261105231000_delivery_only_order_function.sql', import.meta.url), 'utf8');
  const functionBody = migration.split('as $$', 2)[1].split('$$;', 1)[0];

  assert.match(functionBody, /v_fulfillment_mode <> 'delivery'/);
  assert.doesNotMatch(functionBody, /\bpickup_code\b/i);
  assert.doesNotMatch(functionBody, /barla|borriglione|retrait/i);
  assert.match(functionBody, /insert into public\.orders \(customer_id, customer_email, customer_name, customer_phone, delivery_address, fulfillment_mode, status, payment_status, total_cents, order_number\)/);
});
