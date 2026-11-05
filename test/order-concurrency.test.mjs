import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(new URL('../supabase/migrations/20261104120000_order_security_and_stock.sql', import.meta.url), 'utf8');

test('la réservation de stock est atomique et sérialisée par produit', () => {
  assert.match(migration, /select p\.name[\s\S]*?stock_quantity\s*>=\s*v_quantity[\s\S]*?for update/i);
  assert.match(migration, /update public\.products[\s\S]*?set stock_quantity\s*=\s*stock_quantity\s*-\s*v_quantity/i);
  assert.match(migration, /where id\s*=\s*v_product_id[\s\S]*?stock_quantity\s*>=\s*v_quantity/i);
  assert.match(migration, /if not found then[\s\S]*?Un article n’est plus disponible en quantité suffisante/i);
  assert.match(migration, /Any later error rolls back[\s\S]*?all decrements together with the order/i);
});
