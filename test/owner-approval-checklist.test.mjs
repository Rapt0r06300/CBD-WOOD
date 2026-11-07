import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const checklist = await readFile(new URL('../docs/validation/2026-11-07-owner-approval-checklist.md', import.meta.url), 'utf8');
const roadmap = await readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8');

test('la checklist propriétaire couvre les décisions visuelles WOOD', () => {
  for (const term of ['Identité WOOD', 'chic / premium', 'chill / graffiti', 'humour', 'sous cloche', 'mobile', 'TealerLab']) {
    assert.match(checklist, new RegExp(term.replace('/', '\\/'), 'iu'));
  }
  assert.match(checklist, /oui|non/iu);
  assert.match(checklist, /aucune validation implicite|validation explicite/iu);
  assert.match(roadmap, /\[x\] \*\*TXW-112/u);
});
