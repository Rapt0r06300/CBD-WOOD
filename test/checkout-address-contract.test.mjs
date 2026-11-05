import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../checkout.html', import.meta.url), 'utf8');
const enhancement = await readFile(new URL('../checkout-required.js', import.meta.url), 'utf8');
const validation = await readFile(new URL('../supabase/functions/create-pending-order/validation.mjs', import.meta.url), 'utf8');

test('la livraison exige les coordonnées et conserve une adresse corrigeable', () => {
  assert.match(html, /checkout-required\.js/);
  assert.match(enhancement, /orderName/);
  assert.match(enhancement, /orderPhone/);
  assert.match(enhancement, /aria-required/);
  assert.match(validation, /Nom complet nécessaire/);
  assert.match(validation, /Téléphone nécessaire/);
  assert.match(validation, /normalizeDeliveryAddress/);
  assert.match(validation, /delivery_address_details/);
});
