import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

test('le récapitulatif de commande expose les informations essentielles avant Viva', async () => {
  const html = await readFile(new URL('checkout.html', root), 'utf8');
  const boutique = await readFile(new URL('boutique.js', root), 'utf8');

  for (const id of ['checkoutItems', 'checkoutTotal', 'orderModeSummary', 'orderEmail', 'orderAddress', 'createOrderButton']) {
    assert.match(html, new RegExp(`id="${id}"`), `checkout.html doit conserver #${id}`);
  }
  assert.match(html, /Votre sélection/);
  assert.match(html, /Total provisoire/);
  assert.match(html, /Livraison à domicile/);
  assert.match(html, /paiement Viva\.com sera activé séparément/);
  assert.match(html, /paiement en ligne Viva sera ajouté séparément/);
  assert.match(boutique, /item\.weight/);
  assert.match(boutique, /item\.quantity/);
  assert.match(boutique, /item\.price/);
  assert.match(boutique, /cartTotal/);
});

test('le récapitulatif ne promet ni retrait ni paiement Viva actif', async () => {
  const html = await readFile(new URL('checkout.html', root), 'utf8');
  assert.doesNotMatch(html, /Retrait à|retrait en magasin/i);
  assert.match(html, /paiement en attente/);
  assert.match(html, /id="createOrderButton"[^>]*disabled/);
});
