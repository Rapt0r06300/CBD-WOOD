import assert from 'node:assert/strict';
import test from 'node:test';

import { buildOrderEmailMessage } from './message.mjs';

const order = {
  order_number: 'WOOD-1001',
  customer_name: 'Florent',
  customer_email: 'client@example.fr',
  status: 'pending',
  payment_status: 'pending',
  total_cents: 4200,
  delivery_address: '1 rue WOOD, 06000 Nice',
};

const items = [{
  product_name: 'Nimbus 3000',
  grams: 3,
  quantity: 1,
  line_total_cents: 4200,
}];

test('builds a pending order message without claiming payment', () => {
  const message = buildOrderEmailMessage({ order, items, kind: 'order_created' });

  assert.equal(message.subject, 'Commande enregistrée — WOOD-1001');
  assert.match(message.text, /en attente de paiement/i);
  assert.match(message.text, /Nimbus 3000/);
  assert.match(message.text, /3 g/);
  assert.match(message.text, /1 rue WOOD/);
  assert.doesNotMatch(message.text, /paiement confirmé|payée/i);
});

test('builds a payment confirmation only for the paid notification kind', () => {
  const message = buildOrderEmailMessage({
    order: { ...order, status: 'paid', payment_status: 'paid' },
    items,
    kind: 'payment_confirmed',
  });

  assert.equal(message.subject, 'Paiement confirmé — WOOD-1001');
  assert.match(message.text, /paiement confirmé/i);
  assert.match(message.html, /Nimbus 3000/);
});
