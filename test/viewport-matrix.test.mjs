import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const roadmap = await readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8');
const evidence = await readFile(new URL('../docs/validation/2026-11-07-viewport-matrix.md', import.meta.url), 'utf8');
const responsive = await readFile(new URL('../responsive.css', import.meta.url), 'utf8');

test('la matrice viewport couvre les largeurs et orientations prévues', () => {
  for (const width of ['320', '360', '375', '390', '430', '768', '1024', '1440']) {
    assert.match(evidence, new RegExp(`\\b${width}\\b`, 'u'));
  }
  for (const route of ['index.html', 'fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html', 'contact.html']) {
    assert.match(evidence, new RegExp(route.replace('.', '\\.'), 'u'));
  }
  assert.match(evidence, /60\s*\/\s*60/u);
  assert.match(evidence, /portrait/u);
  assert.match(evidence, /paysage/u);
  assert.match(evidence, /petite hauteur/u);
  assert.match(roadmap, /\[x\] \*\*TXW-083/u);
});

test('le contrat CSS empêche un débordement horizontal de la racine', () => {
  assert.match(responsive, /html,\s*body\s*\{[\s\S]*max-width:\s*100%;[\s\S]*overflow-x:\s*hidden;/u);
  assert.match(responsive, /img,\s*\nsvg,\s*\nvideo\s*\{[\s\S]*max-width:\s*100%;/u);
});
