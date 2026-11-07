import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('docs/validation/2026-11-07-cro-150-store-selections.json', root), 'utf8'));
const contract = await readFile(new URL('docs/validation/2026-11-07-cro-150-store-selections.md', root), 'utf8');
const visit = await readFile(new URL('rendez-vous.html', root), 'utf8');

test('CRO-150 distingue les deux adresses sans inventer de stock local', () => {
  assert.equal(manifest.status, 'pending-owner-confirmation');
  assert.equal(manifest.stores.length, 2);
  assert.deepEqual(manifest.stores.map((store) => store.id), ['barla', 'borriglione']);
  assert.match(manifest.stores[0].address, /7 rue Barla.*06300 Nice/u);
  assert.match(manifest.stores[1].address, /16 avenue Alfred Borriglione.*06100 Nice/u);
  for (const store of manifest.stores) {
    assert.equal(store.selectionStatus, 'pending');
    assert.equal(store.products.length, 0);
    assert.equal(store.stock, null);
    assert.equal(store.prices, null);
  }
});

test('CRO-150 conserve un affichage public honnête et la porte de validation', () => {
  assert.match(contract, /Barla/iu);
  assert.match(contract, /Borriglione/iu);
  assert.match(contract, /stock/iu);
  assert.match(contract, /prix/iu);
  assert.match(contract, /pending/iu);
  assert.match(contract, /propriétaire/iu);
  assert.match(visit, /horaires affichés restent à confirmer/iu);
  assert.doesNotMatch(visit, /stock Barla|stock Borriglione|meilleure vente Barla|meilleure vente Borriglione/iu);
});
