import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [home, motion, validation] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../wood-motion.css', import.meta.url), 'utf8'),
  readFile(new URL('../docs/validation/2026-11-07-editorial-rhythm.md', import.meta.url), 'utf8'),
]);

test('le rythme éditorial ne répète pas trois introductions DROP', () => {
  assert.match(home, /SCÈNE SIGNATURE/iu);
  assert.match(home, /SÉQUENCE 01 · DÉMO/iu);
  assert.match(home, /SÉQUENCE 02 · DÉMO/iu);
  assert.doesNotMatch(home, /DROP 01 · DÉMO/iu);
  assert.doesNotMatch(home, /DROP 02 · DÉMO/iu);
  assert.doesNotMatch(home, /DROP 03 \/ STUDIO WOOD/iu);
  assert.match(validation, /une scène signature/iu);
});

test('le panneau anis principal garde une hauteur raisonnable sur mobile', () => {
  assert.match(motion, /@media\(max-width:500px\)[\s\S]*?\.wood-pack__hero-media\s*\{[^}]*aspect-ratio:\s*16\s*\/\s*10/iu);
  assert.match(motion, /@media\(max-width:500px\)[\s\S]*?\.wood-pack__hero-copy\s*\{[^}]*min-height:\s*0/iu);
  assert.match(validation, /panneau anis/iu);
  assert.match(validation, /deux écrans consécutifs/iu);
});
