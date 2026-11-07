import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = file => readFile(new URL(file, root), 'utf8');
const audit = await read('docs/validation/2026-11-07-cro-navigation-and-rhythm.md');
const home = await read('index.html');

const publicPages = [
  'fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html',
  'fleur.html', 'produit.html', 'contact.html', 'compte.html',
  'checkout.html', 'confirmation.html',
];

test('la mesure du rythme d’accueil est documentée sur les deux formats', () => {
  assert.match(audit, /390 × 844[\s\S]*20 128[\s\S]*3 577/u);
  assert.match(audit, /1 440 × 900[\s\S]*18 083[\s\S]*3 401/u);
  assert.match(audit, /hero → bandeau de détail → services →[\s\S]*univers/u);
  for (const id of ['univers', 'histoire', 'boutique', 'questions', 'selection-wood', 'preuve', 'communaute']) {
    assert.match(home, new RegExp(`id=["']${id}["']`));
  }
});

test('le menu par besoins reste borné aux destinations WOOD existantes', async () => {
  for (const page of ['index.html', ...publicPages]) {
    const source = await read(page);
    assert.match(source, /href=["'](?:index\.html|#univers)["'][^>]*>[^<]*(?:Accueil|Nos univers)/u);
    assert.match(source, /href=["']fleurs\.html["'][^>]*>Fleurs/u);
    assert.match(source, /href=["']resines\.html["'][^>]*>Résines/u);
    assert.match(source, /href=["']bien-etre\.html["'][^>]*>Cosmétiques/u);
    assert.match(source, /href=["']wood-shop\.html["'][^>]*>Textile/u);
  }
  assert.match(home, /href=["']#boutique["'][^>]*>[^<]*La boutique/u);
  assert.match(home, /href=["']#questions["'][^>]*>FAQ/u);
  assert.match(home, /7 rue Barla[\s\S]*16 avenue Alfred Borriglione/u);
});

test('les fiches gardent un chemin d’entrée et de retour', async () => {
  const flowerDetail = await read('fleur.html');
  const productDetail = await read('produit.html');
  for (const source of [flowerDetail, productDetail]) {
    assert.match(source, /class=["']crumbs["'][\s\S]*href=["']index\.html["']/u);
    assert.match(source, /href=["'](?:fleurs\.html|index\.html#univers)["']/u);
    assert.match(source, /href=["']index\.html#boutique["']/u);
  }
});

test('la carte de parcours couvre les routes publiques sans promesse de paiement', () => {
  for (const page of ['index.html', ...publicPages, '404.html']) {
    assert.ok(audit.includes('`' + page + '`'), `${page} absent de la carte`);
  }
  assert.match(audit, /démo sans envoi/u);
  assert.match(audit, /sans paiement/u);
  assert.match(audit, /préflight des références locales/u);
});
