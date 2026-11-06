import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);

test('le contrat de la boutique fleurs relie les 13 démonstrations aux données et fiches sûres', async () => {
  const contract = await readFile(new URL('../docs/design/wood-flower-shop-contract.md', import.meta.url), 'utf8');
  const catalogue = await readFile(new URL('../fleurs.html', import.meta.url), 'utf8');
  const presentation = require('../flower-presentation.js');
  const storefront = await readFile(new URL('../storefront.js', import.meta.url), 'utf8');
  const detail = await readFile(new URL('../flower-detail.js', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et sources',
    'Catalogue, prix et fiches',
    'États, disponibilité et fallback',
    'Responsive, accessibilité et sécurité',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.equal(Object.keys(presentation.all()).length, 13);
  assert.equal((catalogue.match(/data-product-id="fleurs-[^"]+"/g) || []).length, 13);
  assert.match(catalogue, /flower-presentation\.js/);
  assert.match(catalogue, /data-price="15"/);
  assert.match(storefront, /WoodFlowerPresentation/);
  assert.match(detail, /WoodFlowerPresentation/);
  assert.match(boutique, /getFlowerPriceForOrder/);
  assert.match(boutique, /Tarif à confirmer/);
  assert.match(boutique, /data-product-unavailable/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
