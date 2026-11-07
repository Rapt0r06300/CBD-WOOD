import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const evidence = await readFile(new URL('../docs/validation/2026-11-07-performance-comparison.md', import.meta.url), 'utf8');
const roadmap = await readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8');

test('la comparaison performance conserve un avant, un après et les limites', () => {
  for (const term of ['47360de', 'a0ce769', '439', '452', '175 386', '175 430', '52 / 52', '0 manquante', '0 PNG']) {
    assert.match(evidence, new RegExp(term.replace('/', '\\/'), 'iu'));
  }
  assert.match(evidence, /captures/u);
  assert.match(evidence, /Lighthouse|appareil réel/iu);
  assert.match(roadmap, /\[x\] \*\*TXW-104/u);
});
