import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const prepareSource = await readFile(new URL('../scripts/prepare-hostinger.mjs', import.meta.url), 'utf8');
const preflightSource = await readFile(new URL('../scripts/hostinger-preflight.mjs', import.meta.url), 'utf8');
const ownerDashboard = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');

test('public package uses the integrated owner dashboard and excludes the legacy admin route', () => {
  assert.match(prepareSource, /'owner-dashboard\.css'/);
  assert.match(prepareSource, /'owner-dashboard\.js'/);
  assert.match(prepareSource, /'catalog-demo-hydration\.js'/);
  assert.match(prepareSource, /'home-selection\.css'/);
  assert.match(prepareSource, /'home-engagement\.css'/);
  assert.match(prepareSource, /'wood-engagement\.js'/);
  assert.match(prepareSource, /'owner-media\.mjs'/);
  assert.match(prepareSource, /'owner-product-validation\.mjs'/);
  assert.doesNotMatch(prepareSource, /'admin\.html'/);
  assert.doesNotMatch(prepareSource, /'admin\.js'/);
  assert.doesNotMatch(prepareSource, /'admin\.css'/);
});

test('public package includes every local visual dependency referenced by the demo shell', () => {
  for (const file of [
    'wood-card-views.css',
    'wood-card-views.js',
    'wood-demo-price-hydration.js',
    'wood-guide.css',
    'wood-home-variants.css',
    'wood-home-variants.js',
    'wood-price-source.js',
    'wood-sticker-wall.css',
    'wood-transitions.css',
    'wood-why.css',
    'wood-campaigns.js',
  ]) {
    assert.match(prepareSource, new RegExp(`'${file.replace('.', '\\.')}'`), `${file} absent de l'allowlist`);
  }
});

test('hostinger preflight rejects any public admin route if one is reintroduced', () => {
  assert.match(preflightSource, /admin/i);
  assert.match(preflightSource, /Route admin publique interdite/i);
});

test('owner dashboard prioritises incoming orders before catalogue editing', () => {
  assert.match(ownerDashboard, /ordersSection[\s\S]*productsSection[\s\S]*productsSection\.before\(ordersSection\)/);
});
