import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { extname } from 'node:path';
import test from 'node:test';

import { validateOrderPayload } from '../supabase/functions/create-pending-order/validation.mjs';
import { buildOrderEmailMessage } from '../supabase/functions/email-worker/message.mjs';

const baseOrder = {
  customer_email: 'client@example.fr',
  customer_name: 'Client WOOD',
  customer_phone: '0600000000',
  delivery_address: '1 rue de Nice, 06000 Nice',
  fulfillment_mode: 'delivery',
  idempotency_key: '8d6f26b9-999a-4a19-a934-2a27c7bf62db',
  items: [{ product_id: '11111111-1111-4111-8111-111111111111', grams: 1, quantity: 1 }],
};

test('la frontière de commande borne les contrôles, nombres, Unicode et tailles', () => {
  assert.equal(validateOrderPayload({ ...baseOrder, customer_name: 'Élodie 🌿' }).ok, true);
  assert.equal(validateOrderPayload({ ...baseOrder, customer_name: '<img src=x onerror=alert(1)>' }).ok, true);
  assert.equal(validateOrderPayload({ ...baseOrder, delivery_address: '1 rue de\u0000Nice' }).ok, false);
  assert.equal(validateOrderPayload({ ...baseOrder, items: [{ ...baseOrder.items[0], quantity: 0 }] }).ok, false);
  assert.equal(validateOrderPayload({ ...baseOrder, items: [{ ...baseOrder.items[0], grams: 1.5 }] }).ok, false);
  assert.equal(validateOrderPayload({ ...baseOrder, items: Array.from({ length: 51 }, () => baseOrder.items[0]) }).ok, false);
  assert.equal(validateOrderPayload({ ...baseOrder, delivery_address: 'x'.repeat(501) }).ok, false);
});

test('les données client restent du texte dans les e-mails HTML', () => {
  const message = buildOrderEmailMessage({
    kind: 'order_created',
    order: {
      order_number: 'WOOD-42',
      customer_name: '<script>alert(1)</script>',
      customer_email: 'client@example.fr',
      delivery_address: '1 rue <img src=x onerror=alert(1)>',
      total_cents: 1500,
      payment_status: 'pending',
    },
    items: [{ product_name: '<b>Produit</b>', grams: 1, quantity: 1, line_total_cents: 1500 }],
  });
  assert.doesNotMatch(message.html, /<script(?:\s|>)/iu);
  assert.doesNotMatch(message.html, /<img\s+src=/iu);
  assert.match(message.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/u);
  assert.match(message.html, /&lt;img src=x onerror=alert\(1\)&gt;/u);
});

test('le paquet public ne possède pas de téléversement client de fichier', async () => {
  const entries = await readdir(new URL('../', import.meta.url), { withFileTypes: true });
  const publicFiles = entries
    .filter((entry) => entry.isFile() && ['.html', '.js'].includes(extname(entry.name).toLowerCase()))
    .map((entry) => entry.name);
  for (const file of publicFiles) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /type=["']file["']/iu, `${file} expose un upload public non borné`);
    assert.doesNotMatch(source, /new\s+File\s*\(|new\s+FormData\s*\(/iu, `${file} manipule un fichier côté client sans garde dédiée`);
  }
});
