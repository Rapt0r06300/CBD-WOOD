import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const evidence = await readFile(new URL('../docs/validation/2026-11-07-render-captures.md', import.meta.url), 'utf8');
const roadmap = await readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8');

test('le lot de captures responsive couvre toutes les pages du paquet', () => {
  assert.match(evidence, /24 vues/u);
  assert.match(evidence, /12 pages/u);
  assert.match(evidence, /390×844/u);
  assert.match(evidence, /1440×900/u);
  assert.match(evidence, /Safari.*Android|Android.*Safari/isu);
  assert.match(roadmap, /\[x\] \*\*TXW-117/u);
});
