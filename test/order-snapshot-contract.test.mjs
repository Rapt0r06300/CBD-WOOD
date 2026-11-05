import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(new URL('../supabase/migrations/20261105231000_delivery_only_order_function.sql', import.meta.url), 'utf8');
const hardening = await readFile(new URL('../supabase/migrations/20261104120000_order_security_and_stock.sql', import.meta.url), 'utf8');

test('la commande conserve les champs client et livraison au moment de la création', () => {
  assert.match(migration, /insert into public\.orders \(customer_id, customer_email, customer_name, customer_phone, delivery_address, fulfillment_mode, status, payment_status, total_cents, order_number\)/);
  assert.match(migration, /values \(v_customer_id, v_customer_email, v_customer_name, v_customer_phone, v_delivery_address, v_fulfillment_mode, 'pending', 'pending', v_total_cents, v_order_number\)/);
});

test('les lignes de commande conservent le nom, le prix, le grammage et la quantité', () => {
  assert.match(hardening, /insert into public\.order_items \(order_id, product_id, product_name, unit_price_cents, quantity, line_total_cents, grams\)/);
  assert.match(hardening, /values \(v_order_id, v_product_id, v_product_name, v_unit_price, v_quantity, v_unit_price \* v_quantity, v_grams\)/);
  assert.match(hardening, /select p\.name, p\.category, p\.price_cents/);
});
