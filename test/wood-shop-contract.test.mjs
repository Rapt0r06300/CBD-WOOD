import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat WOOD Shop garde textile et goods visibles mais non achetables', async () => {
  const contract = await readFile(new URL('../docs/design/wood-shop-contract.md', import.meta.url), 'utf8');
  const page = await readFile(new URL('../wood-shop.html', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
  const detail = await readFile(new URL('../product-detail.js', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source',
    'Références et données manquantes',
    'Parcours et états',
    'Responsive, accessibilité et sécurité',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.match(page, /data-catalog-category="wood-shop"/);
  assert.equal((page.match(/class="product-card"/g) || []).length, 3);
  assert.equal((page.match(/class="add-to-cart"[^>]*disabled/g) || []).length, 3);
  assert.match(page, /T-SHIRT \/ À VALIDER/);
  assert.match(page, /APPAREL \/ À VALIDER/);
  assert.match(page, /GOODS \/ À VALIDER/);
  assert.match(page, /Prix à renseigner/);
  assert.match(page, /Disponibilité boutique/);
  assert.match(page, /Fiche à compléter/);
  assert.doesNotMatch(page, /data-price=|data-stock=|data-available=/i);
  assert.match(boutique, /wireGenericCard/);
  assert.match(boutique, /produit\.html\?/);
  assert.match(detail, /availability|Disponibilité à confirmer/iu);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
