import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const publicPages = [
  'index.html', 'fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html',
  'fleur.html', 'produit.html', 'contact.html', 'compte.html', 'checkout.html',
];

const [pages, css, direction] = await Promise.all([
  Promise.all(publicPages.map((page) => readFile(new URL(`../${page}`, import.meta.url), 'utf8'))),
  readFile(new URL('../boutique.css', import.meta.url), 'utf8'),
  readFile(new URL('../docs/design/wood-direction-register.md', import.meta.url), 'utf8'),
]);

test('les pages publiques utilisent le vrai logo WOOD et gardent les slogans maison', () => {
  for (const page of pages) {
    assert.match(page, /assets\/wood-mark\.svg\?v=wood-logo-original-exact-20261103/iu);
    assert.doesNotMatch(page, /tealerlab|tealer lab|420\s*lab/iu);
  }
  const homepage = pages[0];
  assert.match(homepage, /LE CBD AUTREMENT/iu);
  assert.match(homepage, /SI C['’]EST WOOD, C['’]EST GOOD/iu);
});

test('la palette de base reste centralisée et la direction interdit la copie tierce', () => {
  for (const token of ['#101610', '#1B2C20', '#CBF096', '#F1F0E6', '#D8D4BD', '#E8E7D7', '#1D281E']) {
    assert.ok(css.toLowerCase().includes(token.toLowerCase()), `token ${token} absent du CSS WOOD`);
  }
  assert.match(direction, /aucune couleur TealerLab/iu);
  assert.match(direction, /hors prix, stock, paiement/iu);
});
