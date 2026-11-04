import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const publicPages = [
  'index.html',
  'wood-shop.html',
  'fleurs.html',
  'fleur.html',
  'resines.html',
  'bien-etre.html',
  'compte.html',
  'checkout.html',
  'confirmation.html',
];

test('toutes les pages publiques chargent la couche app-like mobile', async () => {
  for (const page of publicPages) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');
    assert.match(html, /mobile\.css\?v=wood-mobile-app-v1-20261104/, `${page} doit charger mobile.css`);
    assert.match(html, /mobile-shell\.js\?v=wood-mobile-app-v1-20261104/, `${page} doit charger mobile-shell.js`);
    assert.match(html, /name="viewport" content="width=device-width, initial-scale=1"/, `${page} doit conserver le viewport responsive`);
  }
});

test('la couche mobile utilise les capacités réelles du navigateur et protège les zones sûres', async () => {
  const stylesheet = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');

  assert.match(stylesheet, /@media \(max-width: 800px\)/);
  assert.match(stylesheet, /@media \(hover: none\)/);
  assert.match(stylesheet, /env\(safe-area-inset-top/);
  assert.match(stylesheet, /env\(safe-area-inset-bottom/);
  assert.match(stylesheet, /min-height: 48px/);
  assert.match(stylesheet, /100svh/);
  assert.match(stylesheet, /@media \(any-pointer: coarse\)/);
  assert.doesNotMatch(shell, /navigator\.userAgent|platform\.toLowerCase/);
  assert.match(shell, /mobile-app-nav/);
  assert.match(shell, /cartTrigger\.click\(\)/);
});

test('la navigation mobile ne se charge pas dans l’espace propriétaire', async () => {
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  const admin = await readFile(new URL('../admin.html', import.meta.url), 'utf8');
  assert.match(shell, /classList\.contains\('admin-page'\)/);
  assert.doesNotMatch(admin, /mobile-shell\.js/);
});
