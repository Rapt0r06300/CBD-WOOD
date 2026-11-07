import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const evidence = await readFile(new URL('../docs/validation/2026-11-07-txw-086-firefox.md', import.meta.url), 'utf8');
const roadmap = await readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8');

test('TXW-086 documente la recette Firefox desktop sans la confondre avec un appareil réel', () => {
  for (const term of ['Firefox local', '1 440 × 900', '13 cartes', '0 image en échec', 'galerie présente', '7 champs', 'aucune différence bloquante']) {
    assert.match(evidence, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'u'));
  }
  assert.match(evidence, /ne remplace pas Safari iOS/u);
  assert.match(roadmap, /^- \[x\] \*\*TXW-086 —/mu);
});
