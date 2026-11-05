import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const listing = await readFile(new URL('fleurs.html', root), 'utf8');
const detail = await readFile(new URL('fleur.html', root), 'utf8');
const genericDetail = await readFile(new URL('produit.html', root), 'utf8');
const boutique = await readFile(new URL('boutique.js', root), 'utf8');
const flowerDetailScript = await readFile(new URL('flower-detail.js', root), 'utf8');
const genericScript = await readFile(new URL('product-detail.js', root), 'utf8');
const stylesheet = await readFile(new URL('boutique.css', root), 'utf8');

test('une carte fleur mène à la fiche dédiée sans supprimer le bloc d’achat', () => {
  assert.match(listing, /class="product-grid"/);
  assert.match(detail, /id="flowerDetail"/);
  assert.match(detail, /src="flower-detail\.js"/);
  assert.match(detail, /Retour aux fleurs/);
  assert.match(boutique, /data-detail-href/);
  assert.match(boutique, /data-gram-step/);
  assert.match(boutique, /add-to-cart/);
});

test('les trois autres univers mènent vers une fiche générique exploitable', () => {
  assert.match(genericDetail, /id="productDetail"/);
  assert.match(genericDetail, /src="product-detail\.js"/);
  assert.match(boutique, /produit\.html\?/);
  assert.match(boutique, /wireGenericCard/);
  assert.match(genericScript, /resines/);
  assert.match(genericScript, /bien-etre/);
  assert.match(genericScript, /wood-shop/);
  assert.match(genericScript, /createClient/);
});

test('la fiche fleur propose uniquement des découvertes du même univers', () => {
  assert.match(flowerDetailScript, /product-related/);
  assert.match(flowerDetailScript, /fleur\.html\?produit=/);
  assert.match(flowerDetailScript, /Même univers/);
  assert.doesNotMatch(flowerDetailScript, /best-seller|promotion|avis|étoile/i);
});

test('les fiches génériques proposent uniquement des produits publiés du même univers', () => {
  assert.match(genericScript, /renderRelated/);
  assert.match(genericScript, /eq\('category', category\)/);
  assert.match(genericScript, /neq\('id', data\.id\)/);
  assert.match(genericScript, /status.*published/);
  assert.match(genericScript, /produit\.html\?produit=/);
  assert.match(genericScript, /Disponibilité à confirmer/);
});

test('le zoom utilise uniquement transform/opacity et garde un accès sans animation', () => {
  assert.match(boutique, /prefers-reduced-motion/);
  assert.match(boutique, /window\.location\.href\s*=\s*href/);
  assert.match(stylesheet, /product-zoom-clone[^{]*\{[\s\S]*?transform:/);
  assert.match(stylesheet, /product-zoom-clone\.is-active[^{]*\{[\s\S]*?transform:/);
  assert.match(stylesheet, /@media\(prefers-reduced-motion:reduce\)/);
});
