import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const source = require('../wood-price-source.js');
const [catalogue, detail, priceHydration, storefront] = await Promise.all([
  readFile(new URL('../fleurs.html', import.meta.url), 'utf8'),
  readFile(new URL('../flower-detail.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-demo-price-hydration.js', import.meta.url), 'utf8'),
  readFile(new URL('../storefront.js', import.meta.url), 'utf8'),
]);

const productIds = [...catalogue.matchAll(/data-product-id="(fleurs-[^"]+)"/gu)].map((match) => match[1]);

test('la source tarifaire démo couvre les 13 fleurs sans valeur nulle', () => {
  assert.equal(productIds.length, 13);
  for (const id of productIds) {
    const tiers = source.getTiers(id);
    assert.equal(tiers.length, 5, `paliers absents pour ${id}`);
    assert.ok(tiers.every((tier) => tier.grams > 0 && tier.price > 0), `prix invalide pour ${id}`);
  }
  assert.equal(source.getTiers('fleurs-inconnue').length, 0);
});

test('cartes et fiches consomment la même fixture avant le panier local', () => {
  assert.match(catalogue, /wood-price-source\.js/u);
  assert.match(detail, /WoodPriceSource\?\.getTiers/u);
  assert.match(priceHydration, /select\.replaceChildren/u);
  assert.match(priceHydration, /tiers\[0\]\.price/u);
  assert.match(storefront, /Prix à confirmer/u);
  assert.match(catalogue, /data-label="1 g" data-price="15"/u);
});
