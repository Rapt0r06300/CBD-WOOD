import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const evidence = await readFile(new URL('../docs/validation/2026-11-07-cro-first-viewport-noise.md', import.meta.url), 'utf8');
const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('le premier viewport garde le message WOOD avant les accents', () => {
  assert.match(evidence, /CTA visibles[\s\S]*390×844[\s\S]*\| 2 \| 390/iu);
  assert.match(evidence, /1440×900[\s\S]*\| 4 \| 5 \| 2/iu);
  assert.match(evidence, /ne pas supprimer les graffitis/iu);
  assert.match(homepage, /Découvrir WOOD/iu);
  assert.match(homepage, /Nous trouver/iu);
});
