import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [home, visit, roadmap] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../rendez-vous.html', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('CRO-015 sépare la scène hero démo des coordonnées locales', () => {
  assert.match(home, /SCÈNE HERO · PHOTO DÉMO/u);
  assert.match(home, /Photographie de démonstration WOOD/u);
  assert.match(home, /href="#boutique"/u);
  assert.match(home, /href="rendez-vous\.html"/u);
  assert.doesNotMatch(home, /lab tested|5\/5|livraison 24h|stock disponible/iu);
  assert.match(visit, /7 rue Barla/u);
  assert.match(visit, /16 avenue Alfred Borriglione/u);
  assert.match(visit, /PHOTO BOUTIQUE À REMPLACER/u);
  assert.match(roadmap, /^- \[x\] \*\*CRO-015 —/mu);
});
