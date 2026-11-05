import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../supabase/functions/delivery-events/index.ts', import.meta.url), 'utf8');

test('une annulation de livraison libère le stock de façon idempotente', () => {
  assert.match(source, /existing\.status === "cancelled"[\s\S]*?rpc\("release_order_stock"/);
  assert.match(source, /nextOrderStatus === "cancelled"[\s\S]*?rpc\("release_order_stock"/);
  assert.match(source, /p_order_id: orderId/);
  assert.match(source, /p_actor_id: userData\.user\.id/);
  assert.match(source, /stock à reprendre/);
});
