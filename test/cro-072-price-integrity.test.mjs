import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const source = require('../wood-price-source.js');
const [catalogue, detail, boutique] = await Promise.all([
  readFile(new URL('../fleurs.html', import.meta.url), 'utf8'),
  readFile(new URL('../flower-detail.js', import.meta.url), 'utf8'),
  readFile(new URL('../boutique.js', import.meta.url), 'utf8'),
]);

const ids = [...catalogue.matchAll(/data-product-id="(fleurs-[^"]+)"/gu)].map((match) => match[1]);

const cardPrices = (id) => {
  const block = catalogue.match(new RegExp(`<article[^>]+data-product-id="${id}"[\\s\\S]*?<\\/article>`, 'u'))?.[0] || '';
  return [...block.matchAll(/data-price="(\d+(?:\.\d+)?)"/gu)].map((match) => Number(match[1]));
};

const detailPrices = (id) => {
  const block = detail.match(new RegExp(`['"]${id}['"]:[\\s\\S]*?prices: tiers\\((\\[\\[.*?\\]\\])\\)`, 'u'))?.[1] || '';
  return [...block.matchAll(/\[(\d+),\s*(\d+(?:\.\d+)?)\]/gu)].map((match) => Number(match[2]));
};

test('les treize cartes et fiches partagent les mêmes paliers démo', () => {
  assert.equal(ids.length, 13);
  for (const id of ids) {
    const expected = source.getTiers(id).map((tier) => tier.price);
    assert.deepEqual(cardPrices(id), expected, `carte divergente pour ${id}`);
    assert.deepEqual(detailPrices(id), expected, `fiche divergente pour ${id}`);
  }
});

test('le panier lit le prix du palier sélectionné et refuse les valeurs vides', () => {
  assert.match(boutique, /option\.dataset\.price/u);
  assert.match(boutique, /price === ''|!variant\.price/u);
  assert.match(boutique, /data-product-price-label/u);
});
