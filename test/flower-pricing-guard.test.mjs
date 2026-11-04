import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const migration = await readFile(new URL('../supabase/migrations/20261104140000_flower_pricing_guard.sql', import.meta.url), 'utf8');
const orderMigration = await readFile(new URL('../supabase/migrations/20261104120000_order_security_and_stock.sql', import.meta.url), 'utf8');
const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');

test('server pricing refuses unvalidated intermediate flower grams', () => {
  assert.match(migration, /create or replace function public\.calculate_flower_price/i);
  assert.match(migration, /p_grams\s+not\s+in\s*\(1,\s*3,\s*5,\s*10,\s*25,\s*50\)/i);
  assert.match(migration, /p_grams\s*=\s*50[\s\S]*25/i);
  assert.match(migration, /return null/i);
});

test('browser keeps the gram selector but disables unvalidated prices', () => {
  assert.match(boutique, /getFlowerPriceForOrder/);
  assert.match(boutique, /Tarif à confirmer/);
  assert.match(boutique, /button\.disabled/);
});

test('the order hardening migration is safe to replay over an existing policy', () => {
  assert.match(orderMigration, /drop policy if exists order_idempotency_no_public_access/i);
  assert.match(orderMigration, /create policy order_idempotency_no_public_access/i);
});
