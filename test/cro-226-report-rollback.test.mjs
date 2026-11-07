import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const report = await readFile(new URL('../docs/validation/2026-11-07-cro-226-report-rollback.md', import.meta.url), 'utf8');
const roadmap = await readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8');

test('le rapport final relie chaque état à une preuve, un risque et un rollback', () => {
  for (const term of ['CRO-226', 'ID', 'état', 'test', 'commit', 'risque', 'rollback', 'D1 est désactivé', 'démo']) {
    assert.match(report, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(report, /GitHub\s+Pages/iu);
  assert.match(roadmap, /\[x\] \*\*CRO-226/u);
});
