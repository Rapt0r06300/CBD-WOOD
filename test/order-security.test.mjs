import assert from 'node:assert/strict';
import test from 'node:test';

const {
  isAllowedOrigin,
  normalizeIdempotencyKey,
  validateOrderPayload,
} = await import('../supabase/functions/create-pending-order/validation.mjs');

test('allows only configured production, demo and local origins', () => {
  const allowed = [
    'https://woodcbd.fr',
    'https://www.woodcbd.fr',
    'https://rapt0r06300.github.io',
    'http://localhost:3000',
  ];
  assert.equal(isAllowedOrigin('https://woodcbd.fr', allowed), true);
  assert.equal(isAllowedOrigin('https://rapt0r06300.github.io', allowed), true);
  assert.equal(isAllowedOrigin('https://evil.example', allowed), false);
  assert.equal(isAllowedOrigin('', allowed), true);
});

test('accepts a UUID idempotency key and rejects unsafe values', () => {
  assert.equal(normalizeIdempotencyKey('8d6f26b9-999a-4a19-a934-2a27c7bf62db'), '8d6f26b9-999a-4a19-a934-2a27c7bf62db');
  assert.equal(normalizeIdempotencyKey('too short'), null);
  assert.equal(normalizeIdempotencyKey('x'.repeat(129)), null);
  assert.equal(normalizeIdempotencyKey('abc<script>'), null);
});

test('validates a delivery order before it reaches the database', () => {
  const valid = validateOrderPayload({
    customer_email: 'client@example.com',
    customer_name: 'Client WOOD',
    customer_phone: '0600000000',
    delivery_address: '1 rue de l’Église,\n06000 Nice',
    fulfillment_mode: 'delivery',
    idempotency_key: '8d6f26b9-999a-4a19-a934-2a27c7bf62db',
    items: [{ product_id: '11111111-1111-4111-8111-111111111111', grams: 3, quantity: 1 }],
  });
  assert.equal(valid.ok, true);
  assert.equal(valid.payload.delivery_address, '1 rue de l’Église, 06000 Nice');
  assert.equal(valid.payload.items[0].grams, 3);
});

test('normalise une adresse structurée sans perdre le snapshot texte', () => {
  const valid = validateOrderPayload({
    customer_email: 'client@example.com',
    customer_name: 'Client WOOD',
    customer_phone: '0600000000',
    delivery_address_details: {
      line1: '7 rue Barla',
      line2: 'Bâtiment B, étage 2',
      postal_code: '06300',
      city: 'Nice',
      country_code: 'fr',
    },
    fulfillment_mode: 'delivery',
    idempotency_key: '8d6f26b9-999a-4a19-a934-2a27c7bf62db',
    items: [{ product_id: '11111111-1111-4111-8111-111111111111', grams: 1, quantity: 1 }],
  });
  assert.equal(valid.ok, true);
  assert.equal(valid.payload.delivery_address, '7 rue Barla, Bâtiment B, étage 2, 06300 Nice');
  assert.deepEqual(valid.payload.delivery_address_details, {
    line1: '7 rue Barla',
    line2: 'Bâtiment B, étage 2',
    postal_code: '06300',
    city: 'Nice',
    country_code: 'FR',
  });
});

test('refuse une adresse structurée incomplète ou dangereuse', () => {
  const base = {
    customer_email: 'client@example.com',
    fulfillment_mode: 'delivery',
    idempotency_key: '8d6f26b9-999a-4a19-a934-2a27c7bf62db',
    items: [{ product_id: '11111111-1111-4111-8111-111111111111', grams: 1, quantity: 1 }],
  };
  assert.equal(validateOrderPayload({ ...base, delivery_address_details: { line1: '7 rue Barla', postal_code: '06300', country_code: 'FR' } }).ok, false);
  assert.equal(validateOrderPayload({ ...base, delivery_address_details: { line1: '7 rue Barla', postal_code: '06300', city: 'Nice', country_code: 'F' } }).ok, false);
  assert.equal(validateOrderPayload({ ...base, delivery_address_details: { line1: '7 rue\u0000Barla', postal_code: '06300', city: 'Nice', country_code: 'FR' } }).ok, false);
});

test('rejects malformed, oversized or non-delivery order payloads', () => {
  const base = {
    customer_email: 'client@example.com',
    delivery_address: '1 rue de Nice',
    fulfillment_mode: 'delivery',
    idempotency_key: '8d6f26b9-999a-4a19-a934-2a27c7bf62db',
    items: [{ product_id: '11111111-1111-4111-8111-111111111111', grams: 1, quantity: 1 }],
  };
  assert.equal(validateOrderPayload({ ...base, fulfillment_mode: 'pickup' }).ok, false);
  assert.equal(validateOrderPayload({ ...base, customer_email: 'not-an-email' }).ok, false);
  assert.equal(validateOrderPayload({ ...base, idempotency_key: '' }).ok, false);
  assert.equal(validateOrderPayload({ ...base, items: [{ ...base.items[0], grams: 51 }] }).ok, false);
  assert.equal(validateOrderPayload({ ...base, items: Array.from({ length: 51 }, () => base.items[0]) }).ok, false);
  assert.equal(validateOrderPayload({ ...base, delivery_address: `1 rue de Nice\u0000, 06000 Nice` }).ok, false);
  assert.equal(validateOrderPayload({ ...base, delivery_address: 'x'.repeat(501) }).ok, false);
});
