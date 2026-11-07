import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const contract = await readFile(new URL('../docs/design/wood-editorial-collections.md', import.meta.url), 'utf8');

test('les collections WOOD sont éditoriales, bornées et reliées aux zones existantes', () => {
  for (const [id, zone] of [['selection-wood', 'id="selection-wood"'], ['mood-wood', 'id="humeurs"'], ['runway-wood', 'id="runway"']]) {
    assert.match(homepage, new RegExp(zone, 'u'));
    assert.match(contract, new RegExp(id, 'u'));
  }
  for (const label of ['Coup de projecteur', 'Par intention', 'Le runway']) assert.match(contract, new RegExp(label, 'u'));
  assert.match(contract, /pas une promotion|aucun stock|aucun prix/iu);
  assert.match(contract, /ne signifient ni best-seller, ni remise/iu);
});
