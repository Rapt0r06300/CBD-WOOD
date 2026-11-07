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
    assert.match(page, /data-wood-catalog-sort/);
  }
});

test('la recherche normalise accents et synonymes sans service distant', async () => {
  const api = await loadApi();
  assert.equal(api.normalize('Résines CBD'), 'resines cbd');
  const card = { dataset: { productName: 'Nimbus 3000', productCategory: 'Fleurs CBD' }, textContent: 'profil botanique' };
  assert.equal(api.matches(card, 'fleur'), true);
  assert.equal(api.matches(card, 'nimbus'), true);
  assert.equal(api.matches(card, 'nimbuz'), true);
  assert.equal(api.matches(card, 'résine'), false);
  assert.equal(api.matches(card, ''), true);
});

test('les filtres combinables restent limités aux états réellement présents', async () => {
  const api = await loadApi();
  const availableDemo = { dataset: { productName: 'Nimbus', productCategory: 'Fleurs', mediaState: 'demo' }, querySelector: () => null, textContent: '' };
  const incompleteDemo = { dataset: { productName: 'Huile', productCategory: 'Bien-être', mediaState: 'demo', productUnavailable: 'true' }, querySelector: () => ({}) , textContent: '' };
  const approved = { dataset: { productName: 'Photo', productCategory: 'Fleurs', mediaState: 'approved', availabilityState: 'available' }, querySelector: () => null, textContent: '' };
  assert.equal(JSON.stringify(api.filterCards([availableDemo, incompleteDemo, approved], '', { media: 'demo', state: 'available' }).map(card => card.dataset.productName)), '["Nimbus"]');
  assert.equal(JSON.stringify(api.filterCards([availableDemo, incompleteDemo, approved], '', { state: 'incomplete' }).map(card => card.dataset.productName)), '["Huile"]');
  assert.equal(JSON.stringify(api.filterCards([availableDemo, incompleteDemo, approved], '', { media: 'approved' }).map(card => card.dataset.productName)), '["Photo"]');
});

test('la recherche ne partage que les états publics dans l’URL', async () => {
  const source = await readFile(new URL('../wood-catalog-search.js', import.meta.url), 'utf8');
  assert.match(source, /URLSearchParams/);
  assert.match(source, /replaceState/);
  assert.match(source, /searchParams\.set\('q'/);
  assert.match(source, /searchParams\.set\('sort'/);
  assert.match(source, /searchParams\.set\('media'/);
  assert.match(source, /searchParams\.set\('state'/);
  assert.match(source, /wood-catalog-search__chip/);
});
