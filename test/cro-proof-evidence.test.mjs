import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const matrix = await readFile(new URL('../docs/design/wood-proof-evidence-matrix.md', import.meta.url), 'utf8');

test('la matrice de preuves distingue source, établissement, date et autorisation', () => {
  for (const term of ['Avis Google', 'Photo produit', 'Qualité / laboratoire', 'établissement', 'auteur public', 'date', 'lien direct', 'autorisation']) {
    assert.match(matrix, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(matrix, /Barla/iu);
  assert.match(matrix, /Borriglione/iu);
});

test('la preuve visible reste bornée à un établissement revalidable', () => {
  const proof = homepage.match(/<section[^>]+id="preuve"[\s\S]*?<\/section>/u)?.[0] || '';
  assert.match(proof, /AVIS GOOGLE · EXTRAITS À REVALIDER/u);
  assert.match(proof, /Barla · Google/u);
  assert.match(proof, /google\.com\/maps\/search/iu);
  assert.doesNotMatch(proof, /Borriglione · Google/iu);
  assert.match(proof, /validation WOOD en attente/iu);
});
