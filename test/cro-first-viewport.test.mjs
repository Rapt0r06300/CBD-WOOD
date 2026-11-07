import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [home, evidence] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../docs/validation/2026-11-07-cro-first-viewport.md', import.meta.url), 'utf8'),
]);

test('le premier écran expose WOOD, sa différence et deux destinations', () => {
  assert.match(home, /class="brand"[\s\S]*?WOOD[\s\S]*?CBD \/ NICE/iu);
  assert.match(home, /class="hero"[\s\S]*?LE CBD[\s\S]*?AUTRE-/iu);
  assert.match(home, /Une autre vision du chanvre[\s\S]*?de vrais conseils/iu);
  assert.match(home, /Découvrir WOOD[\s\S]*?href="#univers"/iu);
  assert.match(home, /Nous trouver[\s\S]*?href="#boutique"/iu);
  assert.match(home, /class="hero-art"[\s\S]*?fetchpriority="high"/iu);
  assert.match(evidence, /375×844.*828 px/isu);
  assert.match(evidence, /390×844.*828 px/isu);
  assert.match(evidence, /1440×900/isu);
});
