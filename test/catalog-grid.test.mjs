import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pages = ['fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html'];

test('all storefront categories use the shared three-column product grid', async () => {
  const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  assert.match(stylesheet, /\.product-grid\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(stylesheet, /@media\(max-width:500px\).*\.product-grid\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);

  for (const page of pages) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');
    assert.match(html, /class="product-grid"/, `${page} doit utiliser la grille boutique partagée`);
    assert.match(html, /href="boutique\.css/, `${page} doit charger boutique.css`);
  }
});
