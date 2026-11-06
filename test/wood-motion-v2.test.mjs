import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [motion, styles, homepage, storefront, prepare] = await Promise.all([
  readFile(new URL('../wood-motion.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-motion.css', import.meta.url), 'utf8'),
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../storefront.js', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/prepare-hostinger.mjs', import.meta.url), 'utf8'),
]);

test('la couche motion coordonne scroll, rails, parallax et retours d’action', () => {
  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /data-wood-rail/);
  assert.match(motion, /data-rail-prev/);
  assert.match(motion, /wood-page-progress/);
  assert.match(motion, /wood-hero-x/);
  assert.match(motion, /wood-button-pulse/);
  assert.match(styles, /prefers-reduced-motion/);
  assert.match(styles, /wood-low-data/);
});

test('l’accueil expose une hiérarchie drop, rails et pack builder sans données inventées', () => {
  for (const value of ['wood-drop-showcase', 'data-wood-rail="selection"', 'data-wood-rail="mood"', 'data-wood-rail="photos"', 'wood-pack__hero', 'PHOTO DÉMO']) {
    assert.match(homepage, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'u'));
  }
  assert.match(homepage, /Aucune offre active/);
  assert.match(homepage, /aucun prix barré/);
});

test('les cartes catalogue exposent un chrome media honnête', () => {
  assert.match(storefront, /product-art__chrome/);
  assert.match(storefront, /PHOTO DÉMO/);
  assert.match(prepare, /wood-motion\.css/);
  assert.match(prepare, /wood-motion\.js/);
  assert.match(prepare, /wood-runway\.css/);
  assert.match(prepare, /rewriteOptimizedMedia/);
  assert.match(prepare, /wood-drop-studio\.webp/);
  assert.match(prepare, /assets\/editorial\/wood-hero-cloche\.webp/);
  assert.match(prepare, /assets\/editorial\/wood-campaign-collage\.webp/);
  assert.match(prepare, /assets\/graffiti\/wood-sticker-good\.svg/);
});
