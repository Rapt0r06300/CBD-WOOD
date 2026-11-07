import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const pages = ['fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html'];

const loadApi = async () => {
  const source = await readFile(new URL('../wood-catalog-search.js', import.meta.url), 'utf8');
  const context = {
    window: { document: { readyState: 'loading', addEventListener() {} } },
  };
  context.window.requestAnimationFrame = (callback) => callback();
  context.globalThis = context.window;
  vm.runInNewContext(source, context);
  return context.window.WoodCatalogSearch;
};

test('les quatre catalogues exposent une recherche locale accessible', async () => {
  const html = await Promise.all(pages.map((page) => readFile(new URL(`../${page}`, import.meta.url), 'utf8')));
  for (const page of html) {
    assert.match(page, /data-wood-catalog-search/);
    assert.match(page, /wood-catalog-search\.css/);
    assert.match(page, /wood-catalog-search\.js/);
    assert.match(page, /wood-catalog-search__alternatives/);
    assert.match(page, /contact\.html/);
    assert.match(page, /class="product-card(?:\s|\")/);
  }
});

test('la recherche normalise accents et synonymes sans service distant', async () => {
  const api = await loadApi();
  assert.equal(api.normalize('Résines CBD'), 'resines cbd');
  const card = { dataset: { productName: 'Nimbus 3000', productCategory: 'Fleurs CBD' }, textContent: 'profil botanique' };
  assert.equal(api.matches(card, 'fleur'), true);
  assert.equal(api.matches(card, 'nimbus'), true);
  assert.equal(api.matches(card, 'résine'), false);
  assert.equal(api.matches(card, ''), true);
});
