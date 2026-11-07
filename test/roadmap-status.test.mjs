import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const roadmap = await readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8');
const status = await readFile(new URL('../docs/validation/2026-11-07-roadmap-status.md', import.meta.url), 'utf8');

test('l’état de route est cohérent avec les cases de la feuille active', () => {
  const rows = [...roadmap.matchAll(/^- \[(x| )\] \*\*([A-Z0-9]+-\d+)/gmu)];
  assert.equal(rows.length, 371);
  assert.equal(rows.filter(row => row[1] === 'x').length, 303);
  assert.equal(rows.filter(row => row[1] === ' ').length, 68);
  assert.match(status, /303 \/ 509/u);
  assert.match(status, /197b485.*249/isu);
  assert.match(status, /138.*tâches différées/iu);
  assert.match(status, /deux validations.*non rattachées/iu);
});
