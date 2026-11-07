import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const read = file => readFile(resolve(root, file), 'utf8');
const pages = ['fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html'];

test('le comparateur reste borné, local et explicable', async () => {
  const source = await read('wood-compare.js');
  assert.match(source, /maxItems = 3/);
  assert.match(source, /URLSearchParams/);
  assert.match(source, /searchParams\.set\('compare'/);
  assert.match(source, /Profil affiché/);
  assert.match(source, /Disponibilité/);
  assert.match(source, /À confirmer/);
  assert.match(source, /navigator\.clipboard\.writeText/);
});

test('les catalogues publient le comparateur avec un repli mobile', async () => {
  for (const page of pages) {
    const html = await read(page);
    assert.match(html, /wood-compare\.css/);
    assert.match(html, /wood-compare\.js/);
  }
  const css = await read('wood-compare.css');
  assert.match(css, /@media\(max-width:600px\)/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  const manifest = await read('scripts/prepare-hostinger.mjs');
  assert.match(manifest, /'wood-compare\.css'/);
  assert.match(manifest, /'wood-compare\.js'/);
});
