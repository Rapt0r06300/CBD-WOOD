import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [evidence, roadmap] = await Promise.all([
  readFile(new URL('../docs/validation/2026-11-07-txw-094-reflow-review.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('TXW-094 conserve la double revue des états à risque', () => {
  for (const term of [
    'TXW-094',
    'avant',
    'après',
    '390 × 844',
    '1440 × 900',
    'texte long',
    'menu ouvert',
    'panier vide',
    'aucun débordement horizontal',
    'régression',
  ]) {
    assert.match(evidence, new RegExp(term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(roadmap, /^- \[x\] \*\*TXW-094 —/mu);
});
