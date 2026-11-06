import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat des fiches produit garde le grammage, le zoom et le retour catalogue', async () => {
  const contract = await readFile(new URL('../docs/design/wood-product-detail-contract.md', import.meta.url), 'utf8');
  const detail = await readFile(new URL('../fleur.html', import.meta.url), 'utf8');
  const flowerScript = await readFile(new URL('../flower-detail.js', import.meta.url), 'utf8');
  const genericScript = await readFile(new URL('../product-detail.js', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
  const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source',
    'Contenu, prix et disponibilité',
    'Parcours et états',
    'Responsive, accessibilité et motion',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.match(detail, /id="flowerDetail"/);
  assert.match(detail, /Retour aux fleurs/);
  assert.match(flowerScript, /Choisir le grammage/);
  assert.match(flowerScript, /Tarifs affichés pour/);
  assert.match(flowerScript, /scope="col"/);
  assert.match(flowerScript, /Visuel de démonstration/);
  assert.match(flowerScript, /product-related/);
  assert.match(flowerScript, /La sélection, les disponibilités et les tarifs sont à confirmer/);
  assert.match(genericScript, /Disponibilité à confirmer/);
  assert.match(genericScript, /status.*published/);
  assert.match(boutique, /product-zoom-clone/);
  assert.match(boutique, /prefers-reduced-motion/);
  assert.match(stylesheet, /product-zoom-clone[^{]*\{[\s\S]*?transform:/);
  assert.match(stylesheet, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
