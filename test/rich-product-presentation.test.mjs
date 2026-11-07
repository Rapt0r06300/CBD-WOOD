import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [storefront, boutique, detail, css, detailHtml] = await Promise.all([
  readFile(new URL('../storefront.js', import.meta.url), 'utf8'),
  readFile(new URL('../boutique.js', import.meta.url), 'utf8'),
  readFile(new URL('../product-detail.js', import.meta.url), 'utf8'),
  readFile(new URL('../boutique.css', import.meta.url), 'utf8'),
  readFile(new URL('../produit.html', import.meta.url), 'utf8'),
]);

test('les cartes catalogue exposent média, disponibilité et prix au gramme dérivé', () => {
  assert.match(storefront, /data-media-state="demo"/u);
  assert.match(storefront, /product-art--cloche/u);
  assert.match(storefront, /data-availability-state=/u);
  assert.match(boutique, /data-product-price-per-gram/u);
  assert.match(boutique, /Prix au gramme|€\s*\/\s*g/u);
  assert.match(css, /product-price-per-gram/u);
  assert.match(css, /product-art--cloche/u);
});

test('la fiche possède une galerie, un zoom accessible et un tableau de grammages', () => {
  assert.match(detail, /data-product-gallery/u);
  assert.match(detail, /data-product-zoom/u);
  assert.match(detail, /data-product-lightbox/u);
  assert.match(detail, /pricing_tiers/u);
  assert.match(detail, /Prix au gramme|€\s*\/\s*g/u);
  assert.match(detailHtml, /product-source-note/iu);
  assert.match(css, /product-lightbox/u);
});
