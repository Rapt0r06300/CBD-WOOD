import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat des cartes produit sépare lecture, disponibilité et ajout au panier', async () => {
  const contract = await readFile(new URL('../docs/design/wood-product-card-contract.md', import.meta.url), 'utf8');
  const catalogue = await readFile(new URL('../fleurs.html', import.meta.url), 'utf8');
  const storefront = await readFile(new URL('../storefront.js', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
  const audit = await readFile(new URL('../docs/design/wood-card-audit.md', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et hiérarchie',
    'Données et états',
    'Parcours et interaction',
    'Responsive, accessibilité et sécurité',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.equal((catalogue.match(/class="product-card"/g) || []).length, 13);
  assert.match(catalogue, /class="product-art"/);
  assert.match(catalogue, /class="product-index"/);
  assert.match(catalogue, /class="product-weight"[^>]*data-product-weight/);
  assert.match(catalogue, /class="product-price-label"[^>]*data-product-price-label/);
  assert.match(catalogue, /class="add-to-cart"/);
  assert.match(storefront, /data-availability-state/);
  assert.match(storefront, /data-product-unavailable/);
  assert.match(storefront, /product-badges/);
  assert.match(storefront, /productVisual/);
  assert.match(boutique, /closest\('button, select, a, input, textarea, \[data-gram-step\]'\)/);
  assert.match(boutique, /openProductDetail\(detailCard\)/);
  assert.match(audit, /profils `STRONG` et `MEDIUM`/);
  assert.match(audit, /La grille tarifaire doit rester accessible, responsive/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
