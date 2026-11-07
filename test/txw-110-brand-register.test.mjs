import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const register = await readFile(new URL('../docs/validation/2026-11-07-txw-110-brand-register.md', import.meta.url), 'utf8');
const roadmap = await readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8');

test('TXW-110 trace la marque et laisse Instagram à confirmer', () => {
  assert.match(register, /woodcbdshop@gmail\.com/u);
  assert.match(register, /https:\/\/www\.woodcbdshop\.com\//u);
  assert.match(register, /@wood\.cbdshop/u);
  assert.match(register, /à confirmer par la propriétaire/u);
  assert.match(register, /owner-provided-pending-approval/u);
  assert.match(roadmap, /^- \[x\] \*\*TXW-110 —/mu);
});
