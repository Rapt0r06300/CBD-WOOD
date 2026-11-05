import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('les animations WOOD restent composées et bornées', async () => {
  const boutique = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const mobile = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');

  assert.match(boutique, /\.wood-reveal\{[^}]*opacity:0[^}]*transform:translate3d/);
  assert.match(boutique, /\.product-zoom-clone\{[^}]*transform:[^}]*will-change:transform/);
  assert.match(boutique, /\.product-card:hover\{transform:translateY\(-5px\)/);
  assert.match(boutique, /\.product-art img\{[^}]*transition:transform \.45s/);
  assert.doesNotMatch(shell, /addEventListener\(['"](?:wheel|touchmove|scroll)['"][\s\S]{0,240}preventDefault/);
  assert.match(shell, /IntersectionObserver/);
  assert.match(shell, /prefers-reduced-motion: reduce/);
  assert.match(shell, /initPhotoMotion/);
  assert.match(shell, /wood-photo-visible/);
  assert.match(boutique, /@keyframes wood-photo-focus/);
  assert.match(boutique, /wood-photo-visible/);
  assert.match(boutique, /@media\(prefers-reduced-motion:reduce\)[\s\S]*?transition:none!important/);
  assert.match(mobile, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?transition:\s*none !important/);
  assert.match(boutique, /\.wood-loading\{animation:wood-loading-pulse \.8s ease-in-out 2/);
  assert.match(boutique, /@keyframes wood-loading-pulse/);
  assert.match(boutique, /@media \(hover:none\) and \(pointer:coarse\)[\s\S]*?\.add-to-cart:active/);
});

test('les actions essentielles restent accessibles sans enhancement mobile', async () => {
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  const pages = ['index.html', 'fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html', 'compte.html', 'checkout.html'];
  const html = await Promise.all(pages.map(page => readFile(new URL(`../${page}`, import.meta.url), 'utf8')));

  assert.match(shell, /if \(!nav \|\| nav\.dataset\.woodStructuredMenu === 'true'\) return/);
  for (const [index, page] of pages.entries()) {
    assert.match(html[index], /href="(?:index\.html#univers|fleurs\.html|resines\.html|bien-etre\.html|wood-shop\.html|compte\.html|checkout\.html)/, `${page} doit conserver un lien public direct`);
  }
});
