import assert from 'node:assert/strict';
import test from 'node:test';

import { buildDocumentModel } from './data.mjs';

const order = {
  id: 'order-1',
  order_number: 'WOOD-1001',
  customer_name: 'Florent',
  customer_email: 'client@example.fr',
  payment_status: 'pending',
  total_cents: 4200,
  delivery_address: '1 rue WOOD, 06000 Nice',
};

const items = [{
  product_name: 'Nimbus 3000',
  quantity: 1,
  grams: 3,
  unit_price_cents: 4200,
  line_total_cents: 4200,
}];

test('builds a command confirmation model from immutable order snapshots', () => {
  const model = buildDocumentModel({ order, items, kind: 'order_confirmation' });

  assert.equal(model.documentKind, 'order_confirmation');
  assert.equal(model.title, 'Confirmation de commande WOOD');
  assert.equal(model.lines[0].label, 'Nimbus 3000');
  assert.equal(model.lines[0].grams, 3);
  assert.equal(model.totalCents, 4200);
});

test('refuses a payment receipt before the payment is confirmed', () => {
  assert.throws(
    () => buildDocumentModel({ order, items, kind: 'payment_receipt' }),
    /paid/i,
  );
});

test('allows a payment receipt only for a paid order', () => {
  const model = buildDocumentModel({
    order: { ...order, payment_status: 'paid' },
    items,
    kind: 'payment_receipt',
  });
  assert.equal(model.title, 'Reçu de paiement WOOD');
});
