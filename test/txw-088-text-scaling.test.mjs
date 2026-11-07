import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [evidence, roadmap] = await Promise.all([
  readFile(new URL('../docs/validation/2026-11-07-txw-088-text-scaling.md', import.meta.url), 'utf8').catch(() => ''),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('TXW-088 conserve une recette de texte agrandi sans chevauchement', () => {
  assert.notEqual(evidence, '', 'le rapport TXW-088 doit exister');
  for (const term of [
    'TXW-088',
    '125 %',
    '150 %',
    '200 %',
    '390 × 844',
    '1440 × 900',
    'line-height',
    'scrollWidth',
    'aucun chevauchement',
    'Dynamic Type',
    'limite',
  ]) {
    assert.match(evidence, new RegExp(term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(roadmap, /^- \[x\] \*\*TXW-088 —/mu);
});
