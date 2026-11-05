import assert from 'node:assert/strict';
import test from 'node:test';

import { deliveryMessage, orderStatusForDelivery, validateDeliveryTransition } from './core.mjs';

test('accepts only the ordered delivery state transitions', () => {
  assert.deepEqual(validateDeliveryTransition({ current: null, next: 'pending' }), { ok: true });
  assert.deepEqual(validateDeliveryTransition({ current: 'pending', next: 'in_progress' }), { ok: true });
  assert.equal(validateDeliveryTransition({ current: 'pending', next: 'delivered' }).ok, false);
  assert.equal(validateDeliveryTransition({ current: 'delivered', next: 'in_progress' }).ok, false);
});

test('maps delivery events to safe order states without inventing a failed order state', () => {
  assert.equal(orderStatusForDelivery('in_progress', 'pending'), 'preparing');
  assert.equal(orderStatusForDelivery('delivered', 'ready'), 'completed');
  assert.equal(orderStatusForDelivery('failed', 'preparing'), 'preparing');
  assert.equal(orderStatusForDelivery('cancelled', 'preparing'), 'cancelled');
});

test('bounds delivery notes and tracking references before persistence', () => {
  const value = deliveryMessage({ status: 'in_progress', note: 'a'.repeat(800), trackingReference: '  WOOD-42  ' });
  assert.equal(value.note.length, 500);
  assert.equal(value.trackingReference, 'WOOD-42');
});
