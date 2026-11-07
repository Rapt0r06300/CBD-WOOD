import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const storefront = await readFile(new URL('../storefront.js', import.meta.url), 'utf8');

test('les médias de démonstration utilisent un repère court sans masquer la transparence', () => {
  assert.match(homepage, />MAQUETTE WOOD</u);
  assert.match(storefront, /MAQUETTE WOOD/u);
  assert.match(homepage, /SCÈNE HERO · PHOTO DÉMO/u);
  const repeatedVisibleLabels = homepage.match(/>PHOTO DÉMO(?:<| ·)/gu) || [];
  assert.ok(repeatedVisibleLabels.length <= 1, 'le libellé technique ne doit pas se répéter sur chaque carte');
  assert.match(homepage, /PHOTOS RÉELLES, PRIX ET STOCKS À VALIDER/u);
});
