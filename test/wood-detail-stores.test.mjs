import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('les fiches proposent les deux itinéraires sans statut commercial inventé', async () => {
  const source = await readFile(new URL('../wood-product-actions.js', import.meta.url), 'utf8');
  assert.match(source, /Barla.*itinéraire/u);
  assert.match(source, /Borriglione.*itinéraire/u);
  assert.match(source, /google\.com\/maps\/dir/u);
  assert.doesNotMatch(source, /en stock|ouvert maintenant|disponible aujourd'hui/iu);
});
