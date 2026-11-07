import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [progress, roadmap] = await Promise.all([
  readFile(new URL('../docs/validation/wood-d1-free-progress.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('D1-025 contient les 25 statuts exacts et un handoff traçable', () => {
  const rows = [...progress.matchAll(/^\| D1-(\d{3}) \| ([A-Z-]+) \|/gmu)];
  assert.equal(rows.length, 25);
  assert.deepEqual(rows.map((row) => row[1]), Array.from({ length: 25 }, (_, index) => String(index + 1).padStart(3, '0')));
  assert.match(progress, /18 \/ 25 — 72,00 %/u);
  assert.match(progress, /BLOCKED-EXTERNAL/u);
  assert.match(progress, /https:\/\/rapt0r06300\.github\.io\/CBD-WOOD\/demo\//u);
  assert.match(progress, /9beff38/u);
  assert.match(progress, /ed2be17/u);
  assert.match(progress, /8f04f6a/u);
  assert.match(progress, /prochaine tâche automatique/iu);
  assert.match(roadmap, /^- \[x\] \*\*D1-025 —/mu);
});
