import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('la carte de contraintes couvre les routes publiques et leurs frontières', async () => {
  const map = await readFile(new URL('../docs/design/wood-constraint-map.md', import.meta.url), 'utf8');

  for (const route of [
    'index.html',
    'fleurs.html',
    'resines.html',
    'bien-etre.html',
    'wood-shop.html',
    'fleur.html',
    'produit.html',
    'compte.html',
    'checkout.html',
    'contact.html',
    'confirmation.html',
    '404.html'
  ]) {
    assert.match(map, new RegExp(`\\b${route.replace('.', '\\.') }\\b`));
  }

  for (const module of [
    'mobile-shell.js',
    'storefront.js',
    'flower-detail.js',
    'product-detail.js',
    'order-api.js',
    'owner-dashboard.js',
    'scripts/site-readiness.mjs'
  ]) {
    assert.match(map, new RegExp(module.replace('.', '\\.'), 'u'));
  }

  assert.match(map, /Supabase.*source de vérité/u);
  assert.match(map, /Viva Wallet.*hors périmètre/u);
  assert.match(map, /aucune route admin publique/u);
});
