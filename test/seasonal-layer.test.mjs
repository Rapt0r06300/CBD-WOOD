import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [script, homepage, styles, roadmap] = await Promise.all([
  readFile(new URL('../wood-campaigns.js', import.meta.url), 'utf8'),
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../wood-editorial.css', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('la couche saisonnière reste réversible et inactive par défaut', () => {
  assert.match(script, /wood-season/u);
  assert.match(script, /halloween/u);
  assert.match(script, /summer/u);
  assert.match(script, /layer\.hidden = true/u);
  assert.match(script, /dataset\.seasonalLayer/u);
  assert.match(script, /layer\.hidden = false/u);
  assert.match(styles, /wood-seasonal-layer/u);
});

test('la couche saisonnière ne modifie ni catalogue ni offre', () => {
  assert.doesNotMatch(script, /price|stock|promo|voucher|checkout/iu);
  assert.doesNotMatch(script, /€|data-price|data-stock|promotion|voucher/iu);
  assert.match(roadmap, /TXW-051/u);
});
