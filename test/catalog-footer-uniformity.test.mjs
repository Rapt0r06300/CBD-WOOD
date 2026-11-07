import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const pages = ['fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html'];
const sources = await Promise.all(pages.map(async (page) => [page, await readFile(new URL(`../${page}`, import.meta.url), 'utf8')]));

test('les quatre univers gardent le même shell de navigation et de footer', () => {
  for (const [page, source] of sources) {
    assert.match(source, /mobile-shell\.js/u, `${page}: shell mobile absent`);
    assert.match(source, /href="index\.html"/u, `${page}: retour accueil absent`);
    assert.match(source, /href="index\.html#boutique"/u, `${page}: accès boutique absent`);
    assert.match(source, /class="footer"/u, `${page}: footer partagé absent`);
    assert.match(source, /wood-catalog-search\.js/u, `${page}: recherche catalogue absente`);
  }
});

test('les catégories conservent leurs libellés publics distincts', () => {
  const expected = {
    'fleurs.html': 'Fleurs CBD',
    'resines.html': 'Résines',
    'bien-etre.html': 'Bien-être',
    'wood-shop.html': 'WOOD Shop',
  };
  for (const [page, source] of sources) assert.match(source, new RegExp(expected[page], 'u'));
});
