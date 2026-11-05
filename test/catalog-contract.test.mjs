import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

test('la disponibilité de livraison est annoncée sans inventer de tarif, délai ou transporteur', async () => {
  const pages = await Promise.all(['fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html'].map(async (page) => readFile(new URL(page, root), 'utf8')));
  for (const html of pages) {
    assert.match(html, /data-purchase-notice>Livraison disponible à domicile<\/span>/);
    assert.doesNotMatch(html, /\b(?:24h|48h|express|gratuit|\d+\s*€|chronopost|colissimo)\b/i);
  }
  const homepage = await readFile(new URL('index.html', root), 'utf8');
  assert.match(homepage, /La livraison à domicile est disponible\./);
  assert.match(homepage, /frais, zones et délais seront précisés/);
});

test('les données manquantes restent visibles et non achetables', async () => {
  const source = await readFile(new URL('storefront.js', root), 'utf8');
  assert.match(source, /availabilityState/);
  assert.match(source, /Disponibilité à confirmer/);
  assert.match(source, /Prix à confirmer/);
  assert.match(source, /data-product-unavailable/);
  assert.match(source, /disabled aria-disabled="true"/);
  assert.match(source, /Photo de démonstration/);
  assert.match(source, /Illustration/);
});

test('les cartes relient la référence à une fiche interactive sans fusionner les contrôles', async () => {
  const boutique = await readFile(new URL('boutique.js', root), 'utf8');
  const detail = await readFile(new URL('flower-detail.js', root), 'utf8');
  const generic = await readFile(new URL('product-detail.js', root), 'utf8');
  assert.match(boutique, /data-detail-href/);
  assert.match(boutique, /openProductDetail\(detailCard\)/);
  assert.match(boutique, /closest\('button, select, a, input, textarea, \[data-gram-step\]'\)/);
  assert.match(detail, /data-product-weight/);
  assert.match(detail, /data-product-price-label/);
  assert.match(detail, /add-to-cart/);
  assert.match(generic, /data-product-unavailable/);
});
