import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../supabase/functions/delivery-events/index.ts', import.meta.url), 'utf8');

test('delivery events require an authenticated owner and an idempotency key', () => {
  assert.match(source, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(source, /auth\.getUser\(accessToken\)/);
  assert.match(source, /owner_users/);
  assert.match(source, /Idempotency-Key/);
  assert.match(source, /event_key/);
  assert.match(source, /order_notification_outbox/);
  assert.doesNotMatch(source, /SUPABASE_ANON_KEY/);
});

test('delivery events are delivery-only and use validated transitions', () => {
  assert.match(source, /fulfillment_mode !== "delivery"/);
  assert.match(source, /validateDeliveryTransition/);
  assert.match(source, /orderStatusForDelivery/);
  assert.match(source, /code === "23505"/);
});
