import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const motion = await readFile(new URL('../wood-motion.js', import.meta.url), 'utf8');

test('le hero possède un repli local sans dépendre de l’image principale', () => {
  assert.match(homepage, /data-hero-image[^>]*fetchpriority="high"/u);
  assert.match(homepage, /class="hero-art__fallback"[^>]*role="status"[^>]*hidden/u);
  assert.match(homepage, /Les univers WOOD restent accessibles/u);
  assert.match(motion, /classList\.add\('is-media-fallback'\)/u);
  assert.match(motion, /addEventListener\('error', showFallback/u);
  assert.match(motion, /naturalWidth === 0/u);
  assert.match(motion, /aria-hidden/u);
});

test('le repli garde un langage WOOD et l’absence de promesse commerciale', () => {
  const fallback = homepage.match(/<div class="hero-art__fallback"[\s\S]*?<\/div>/u)?.[0] ?? '';
  assert.match(fallback, /SCÈNE WOOD · REPLI/u);
  assert.match(fallback, /Le détail reste visible/u);
  assert.doesNotMatch(fallback, /prix|promotion|stock disponible/iu);
});
