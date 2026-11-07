import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const css = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
const responsiveCss = await readFile(new URL('../responsive.css', import.meta.url), 'utf8');
const catalogCss = await readFile(new URL('../wood-catalog-search.css', import.meta.url), 'utf8');
const home = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const guide = await readFile(new URL('../docs/validation/2026-11-07-one-hand-mobile.md', import.meta.url), 'utf8');

test('les cibles une main restent atteignables et dimensionnées', () => {
  assert.match(css, /\.hamb[\s\S]*min-height:\s*48px/u);
  assert.match(css, /\.mobile-app-nav a[\s\S]*min-width:\s*44px/u);
  assert.match(css, /\.add-to-cart[\s\S]*min-width:\s*44px/u);
  assert.match(responsiveCss, /\.cart-qty[\s\S]*width:\s*44px[\s\S]*height:\s*44px/u);
  assert.match(catalogCss, /\.wood-catalog-search__filter select[\s\S]*min-height:\s*44px/u);
  assert.match(home, /data-wood-icon="directions"/u);
  assert.match(home, /href="https:\/\/www\.google\.com\/maps\/dir\//u);
  assert.doesNotMatch(css, /position:\s*fixed[^}]*add-to-cart/iu);
});

test('la preuve distingue la vérification locale de la validation appareil', () => {
  for (const term of ['320/390 px', '≥ 44 px', 'encoche', 'iOS', 'Android', 'démo']) {
    assert.match(guide, new RegExp(term.replace('/', '\\/'), 'iu'));
  }
});
