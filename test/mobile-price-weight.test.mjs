import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const css = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
const flowers = await readFile(new URL('../fleurs.html', import.meta.url), 'utf8');
const detail = await readFile(new URL('../flower-detail.js', import.meta.url), 'utf8');
const guide = await readFile(new URL('../docs/validation/2026-11-07-mobile-price-weight.md', import.meta.url), 'utf8');

test('prix, statut, grammage et action ont un repli mobile explicite', () => {
  assert.match(css, /@media\(max-width:500px\)[\s\S]*\.product-grid \.product-meta\s*\{[\s\S]*gap:\s*8px/u);
  assert.match(css, /product-meta \.product-price-label[^}]*font-size:clamp\(10px,3\.2vw,13px\)/u);
  assert.match(css, /product-meta \.product-status[^}]*overflow-wrap:anywhere/u);
  assert.match(css, /product-meta \.add-to-cart[^}]*min-width:0/u);
  assert.match(flowers, /data-product-weight/u);
  assert.match(flowers, /data-product-price-label/u);
  assert.match(flowers, /class="add-to-cart"/u);
  assert.match(css, /product-price-per-gram/u);
  assert.match(detail, /data-product-price-label/u);
});

test('la preuve couvre les largeurs compactes et le grossissement', () => {
  for (const term of ['320 px', '390 px', 'texte grossi', 'zoom', 'Prix à renseigner']) {
    assert.match(guide, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
});
