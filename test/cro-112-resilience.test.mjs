import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [homepage, motion, storefront, adapter] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../wood-motion.js', import.meta.url), 'utf8'),
  readFile(new URL('../storefront.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-d1-adapter.js', import.meta.url), 'utf8'),
]);

test('CRO-112 garde le parcours local quand mouvement, média ou D1 échouent', () => {
  assert.match(motion, /prefers-reduced-motion: reduce/u);
  assert.match(motion, /saveData|effectiveType/u);
  assert.match(motion, /wood-low-data/u);
  assert.match(motion, /IntersectionObserver/u);
  assert.match(motion, /hero-art__fallback|is-media-fallback/u);
  assert.match(storefront, /wireProductImageFallbacks/u);
  assert.match(storefront, /woodFallbackApplied/u);
  assert.match(storefront, /Illustration botanique de repli/u);
  assert.match(adapter, /catch \{[\s\S]*?return null/u);
  assert.match(homepage, /data-hero-image[^>]*fetchpriority="high"/u);
  assert.match(homepage, /href="#boutique"|href="boutique\.html"/u);
});
