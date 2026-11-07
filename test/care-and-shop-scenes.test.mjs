import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const [care, shop, css] = await Promise.all([
  readFile(new URL('../bien-etre.html', import.meta.url), 'utf8'),
  readFile(new URL('../wood-shop.html', import.meta.url), 'utf8'),
  readFile(new URL('../boutique.css', import.meta.url), 'utf8'),
]);

test('les familles bien-être sont navigables sans inventer une famille absente', () => {
  assert.match(care, /data-care-family-nav/iu);
  for (const family of ['cosmetiques', 'huiles', 'soins']) {
    assert.match(care, new RegExp(`data-care-family="${family}"`, 'u'));
    assert.match(care, new RegExp(`id="care-family-${family}"`, 'u'));
  }
  assert.doesNotMatch(care, /data-care-family="produits-divers"/u);
});

test('WOOD Shop distingue les accessoires concrets du textile sans les rendre achetables', () => {
  assert.match(shop, /data-family="accessoires"[\s\S]*Feuilles[\s\S]*Grinders[\s\S]*Briquets/iu);
  assert.match(shop, /data-product-id="woodshop-feuilles"[\s\S]*data-product-unavailable/iu);
  assert.match(shop, /data-product-id="woodshop-grinders"[\s\S]*data-product-unavailable/iu);
  assert.match(shop, /data-product-id="woodshop-briquets"[\s\S]*data-product-unavailable/iu);
});

test('WOOD Shop possède une scène lifestyle et une galerie textile de fallback', () => {
  assert.match(shop, /class="wood-shop-scene\b[\s\S]*data-state="demo"/u);
  assert.match(shop, /class="wood-textile-gallery\b/iu);
  for (const slot of ['tshirt-front', 'marking-detail']) {
    assert.match(shop, new RegExp(`data-textile-slot="${slot}"`, 'u'));
  }
  assert.match(shop, /PHOTO TEXTILE À REMPLACER/gu);
});

test('les variantes textile restent locales et désactivées tant que les données manquent', () => {
  assert.match(shop, /wood-variant-fields/iu);
  assert.match(shop, /name="size"[^>]*disabled/iu);
  assert.match(shop, /name="color"[^>]*disabled/iu);
  assert.match(shop, /Taille à confirmer/iu);
  assert.match(shop, /Coloris à confirmer/iu);
  assert.match(css, /@media[^{}]*max-width\s*:\s*760px[\s\S]*?wood-(?:shop-scene|textile-gallery)/iu);
  assert.match(css, /prefers-reduced-motion[\s\S]*?wood-(?:shop-scene|textile-gallery)/iu);
});
