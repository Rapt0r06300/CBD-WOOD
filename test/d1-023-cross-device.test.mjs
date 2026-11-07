import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [evidence, roadmap] = await Promise.all([
  readFile(new URL('../docs/validation/2026-11-07-d1-023-cross-device.md', import.meta.url), 'utf8').catch(() => ''),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('D1-023 conserve une recette locale cross-device complète et honnête', () => {
  assert.notEqual(evidence, '', 'le rapport D1-023 doit exister');
  for (const term of [
    'D1-023',
    '320 × 844',
    '360 × 844',
    '375 × 844',
    '390 × 844',
    '430 × 844',
    '768 × 1024',
    '1024 × 900',
    '1440 × 900',
    'scrollWidth',
    'CLS',
    'clavier',
    'tactile',
    'reduced-motion',
    'image manquante',
    'focus',
    'd1-023-home-320x844.png',
    'd1-023-home-1440x900.png',
    'Safari iOS',
    'Android réel',
  ]) {
    assert.match(evidence, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(roadmap, /^- \[x\] \*\*D1-023 —/mu);
});
