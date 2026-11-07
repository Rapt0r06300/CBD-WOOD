import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const report = await readFile(new URL('../docs/validation/2026-11-07-visitor-profiles.md', import.meta.url), 'utf8');
const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const flowers = await readFile(new URL('../fleurs.html', import.meta.url), 'utf8');

test('les profils novice et habitué ont des parcours démo distincts', () => {
  for (const label of ['Novice', 'Habitué']) assert.match(report, new RegExp(`## ${label}`, 'u'));
  assert.match(homepage, /Nos univers/u);
  assert.match(homepage, /href="fleur\.html\?produit=fleurs-/u);
  assert.match(homepage, /href="tel:/u);
  assert.match(flowers, /wood-catalog-search|data-catalog-search/iu);
  assert.match(flowers, /wood-compare|data-compare/iu);
  assert.match(report, /ne prétend pas mesurer|sans collecter/iu);
  assert.doesNotMatch(report, /taux de réussite.*[0-9]|conversion de [0-9]/iu);
});
