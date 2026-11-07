import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [evidence, roadmap] = await Promise.all([
  readFile(new URL('../docs/validation/2026-11-07-txw-087-zoom.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('TXW-087 conserve une recette de reflow 200 et 400 pour les actions clés', () => {
  for (const term of ['TXW-087', '200 %', '400 %', 'Accueil', 'Rendez-vous', 'menu', 'boutons', 'footer', 'aucun débordement', 'limite']) {
    assert.match(evidence, new RegExp(term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(roadmap, /^- \[x\] \*\*TXW-087 —/mu);
});
