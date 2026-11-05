import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../supabase/functions/delivery-events/index.ts', import.meta.url), 'utf8');

test('les événements de livraison passent par la transition serveur et peuvent reprendre une annulation', () => {
  assert.match(source, /existingOrderStatus !== order\.status[\s\S]*?rpc\("service_update_order_status"/);
  assert.match(source, /nextOrderStatus !== order\.status[\s\S]*?rpc\("service_update_order_status"/);
  assert.match(source, /p_order_id: orderId/);
  assert.match(source, /p_actor_id: userData\.user\.id/);
  assert.match(source, /p_next_status: nextOrderStatus/);
});
