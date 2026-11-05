import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const microcopy = await readFile(new URL('../docs/design/wood-microcopy.md', import.meta.url), 'utf8');
const pages = await Promise.all(['index.html', 'fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html', 'checkout.html', 'compte.html'].map(file => readFile(new URL(`../${file}`, import.meta.url), 'utf8')));
const storefront = pages.join('\n');

test('la bibliothèque de micro-copy couvre les actions sensibles de WOOD', () => {
  for (const phrase of ['Ajouter au panier', 'Réessayer', 'Livraison à domicile disponible', 'Mot de passe oublié ?', 'Votre panier est vide.']) {
    assert.match(microcopy, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('les pages et la bibliothèque n’introduisent pas de promesse commerciale non validée', () => {
  assert.match(microcopy, /Pas de bénéfice médical/);
  assert.match(microcopy, /retrait en boutique/);
  assert.doesNotMatch(storefront, /best[- ]seller|meilleur vendeur|effet garanti/i);
});
