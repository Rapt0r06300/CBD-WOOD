import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [report, roadmap] = await Promise.all([
  readFile(new URL('../docs/validation/2026-11-07-cro-128-measurable-reversible-report.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('CRO-128 relie les statuts, preuves, mesures et commits sans inventer de validation', () => {
  for (const term of ['312 / 509', '313 / 509', '521 tests', '2f50df4', 'revert', 'GitHub Pages', '58 tickets', '138 tâches différées']) {
    assert.match(report, new RegExp(term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(report, /propriétaire|appareil physique|source réelle/iu);
  assert.doesNotMatch(report, /validation propriétaire.*DONE|avis Google.*validés/iu);
});

test('CRO-128 est marqué dans la feuille active sans fermer les portes externes', () => {
  assert.match(roadmap, /\[x\] \*\*CRO-128/u);
  assert.match(roadmap, /BLOCKED-EXTERNAL|validation propriétaire/iu);
});
