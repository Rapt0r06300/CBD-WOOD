import test from 'node:test';
import assert from 'node:assert/strict';
import { validateMarkup, validateWoodContent } from '../scripts/validate-wood-content.mjs';

test('le contrôle contenu actuel passe sur les quatre catalogues', async () => {
  assert.deepEqual(await validateWoodContent(), []);
});

test('une fixture invalide échoue sur doublon, prix et état média', () => {
  const fixture = '<article data-product-id="x" data-product-name="X" data-media-state="invented"><img src="assets/missing.svg"><select><option data-label="" data-price="0"></option></select></article><article data-product-id="x" data-product-name="X"></article>';
  const errors = validateMarkup(fixture);
  assert.ok(errors.some(error => error.includes('dupliqué')));
  assert.ok(errors.some(error => error.includes('média absent')));
  assert.ok(errors.some(error => error.includes('tarifaire invalide')));
  assert.ok(errors.some(error => error.includes('état média invalide')));
});

test('une allégation santé visible échoue', () => {
  const errors = validateMarkup('<article data-product-id="x" data-product-name="X"><p>Ce produit soigne tout.</p></article>');
  assert.ok(errors.some(error => error.includes('formulation santé')));
});
