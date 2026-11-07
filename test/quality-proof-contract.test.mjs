import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const product = await readFile(new URL('product-detail.js', root), 'utf8');
const genericPage = await readFile(new URL('produit.html', root), 'utf8');
const flowerPage = await readFile(new URL('fleur.html', root), 'utf8');
const contract = await readFile(new URL('docs/design/wood-quality-proof-contract.md', root), 'utf8');

test('les fiches réservent une ligne de source compacte et honnête', () => {
  for (const page of [genericPage, flowerPage]) {
    assert.match(page, /product-source-note/u);
    assert.match(page, /data-quality-state="empty"/u);
    assert.match(page, /Aucune source vérifiée à afficher/u);
    assert.match(page, /À fournir/u);
  }

  assert.match(product, /qualityProofMarkup/u);
  assert.match(product, /verified/u);
  assert.match(product, /source/u);
  assert.match(product, /Aucune source vérifiée à afficher/u);
  assert.doesNotMatch(product, /meilleur|efficace|guérit|garanti|laboratoire validé/u);
  assert.match(contract, /statut `verified`/u);
  assert.match(contract, /validation propriétaire/u);
});
