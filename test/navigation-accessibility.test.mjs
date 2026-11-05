import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');

test('le panier gère son dialogue et rend le focus au déclencheur', () => {
  assert.match(boutique, /role="dialog"/);
  assert.match(boutique, /aria-modal="true"/);
  assert.match(boutique, /lastCartTrigger/);
  assert.match(boutique, /\.focus\(/);
});

test('le menu mobile conserve le focus et son état accessible', () => {
  assert.match(boutique, /lastMenuTrigger/);
  assert.match(boutique, /nav\.focus\(/);
  assert.match(shell, /aria-label/);
});

test('le menu public expose les quatre univers et les accès rapides sans administration', async () => {
  const pages = ['index.html', 'fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html', 'fleur.html', 'checkout.html', 'confirmation.html', 'compte.html'];
  for (const page of pages) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');
    assert.match(html, /nav-menu-label/);
    assert.match(html, /Cosmétiques &amp; huiles/);
    assert.match(html, /Textile &amp; produits dérivés/);
    assert.match(html, /href="compte\.html"/);
    assert.match(html, /href="checkout\.html"/);
    assert.doesNotMatch(html, /admin\.html/i);
  }
});

test('le shell mobile prévoit des sous-menus avec retour sans dépendre d’une page admin', async () => {
  const mobileShell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  const mobileStyles = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  assert.match(mobileShell, /nav-menu-trigger/);
  assert.match(mobileShell, /nav-menu-back/);
  assert.match(mobileShell, /Retour au menu/);
  assert.match(mobileStyles, /nav-structured/);
  assert.match(mobileStyles, /data-menu-view\^=/);
});
