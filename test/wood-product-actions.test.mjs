import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const read = file => readFile(resolve(root, file), 'utf8');
const cataloguePages = ['fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html'];
const detailPages = ['fleur.html', 'produit.html'];

test('les actions catalogue restent locales et accessibles', async () => {
  const source = await read('wood-product-actions.js');
  assert.match(source, /localStorage/);
  assert.match(source, /wood-favorites-v1/);
  assert.match(source, /wood-store-list-v1/);
  assert.match(source, /wood-recent-v1/);
  assert.match(source, /aria-pressed/);
  assert.match(source, /data-wood-favorite/);
  assert.match(source, /data-wood-preview/);
  assert.match(source, /showModal/);
  assert.match(source, /data-wood-preview-close/);
  assert.match(source, /À montrer en boutique/);
  assert.match(source, /searchParams\.set\('liste'/);
});

test('les fiches proposent un partage natif ou une copie sans envoi serveur', async () => {
  const source = await read('wood-product-actions.js');
  assert.match(source, /navigator\.share/);
  assert.match(source, /navigator\.clipboard\.writeText/);
  assert.match(source, /data-wood-share/);
  for (const page of detailPages) assert.match(await read(page), /wood-product-actions\.js/);
});

test('le bouton aperçu s’insère dans son hôte sans double branchement DOM', async () => {
  const source = await read('wood-product-actions.js');
  assert.match(source, /if \(meta\) meta\.prepend\(preview\);/u);
  assert.doesNotMatch(source, /insertBefore\(preview, meta \|\| null\)/u);
});

test('les quatre catalogues publient le module et sa feuille de style', async () => {
  for (const page of cataloguePages) {
    const html = await read(page);
    assert.match(html, /wood-product-actions\.css/);
    assert.match(html, /wood-product-actions\.js/);
  }
  const manifest = await read('scripts/prepare-hostinger.mjs');
  assert.match(manifest, /'wood-product-actions\.css'/);
  assert.match(manifest, /'wood-product-actions\.js'/);
});

test('le rendu local se replie sur mobile et reduced-motion', async () => {
  const css = await read('wood-product-actions.css');
  assert.match(css, /@media\(max-width:600px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /safe-area-inset-bottom/);
});
