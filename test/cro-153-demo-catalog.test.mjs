import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import test from 'node:test';

const require = createRequire(import.meta.url);
const source = require('../wood-demo-catalog.js');
const [fleurs, detail, priceSource, seed, roadmap] = await Promise.all([
  readFile(new URL('../fleurs.html', import.meta.url), 'utf8'),
  readFile(new URL('../fleur.html', import.meta.url), 'utf8'),
  readFile(new URL('../wood-price-source.js', import.meta.url), 'utf8'),
  readFile(new URL('../backend/cloudflare-d1/seed/wood-demo.sql', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('CRO-153 relie la source unique du catalogue aux vues démo et à D1', () => {
  const products = source.all();
  assert.equal(products.length, 13);
  assert.match(fleurs, /src="wood-demo-catalog\.js"/u);
  assert.match(detail, /src="wood-demo-catalog\.js"/u);
  assert.match(priceSource, /WoodDemoCatalog/u);
  for (const product of products) {
    assert.match(seed, new RegExp(product.id.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'u'));
    assert.match(seed, new RegExp(product.name.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'u'));
    assert.ok(product.tiers.length > 0, `${product.id} doit garder ses paliers démo`);
  }
  assert.match(roadmap, /^- \[x\] \*\*CRO-153 —/mu);
});

test('CRO-153 ne transforme pas la source démo en prix de production', () => {
  assert.equal(source.status, 'demo-fixture');
  assert.equal(source.commerciallyActive, false);
  assert.equal(source.all().every((product) => product.status === 'demo'), true);
});
