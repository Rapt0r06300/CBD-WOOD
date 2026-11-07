import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const report = await readFile(new URL('../docs/validation/2026-11-07-commercial-quality-grid.md', import.meta.url), 'utf8');

test('la grille qualité reste motivée et provisoire', () => {
  for (const criterion of ['Clarté', 'Désir de découvrir', 'Authenticité', 'Lisibilité', 'Confiance', 'Invitation à visiter']) {
    assert.match(report, new RegExp(`\\| ${criterion} \\| 4 \\|`, 'u'));
  }
  assert.match(report, /pas une promesse de conversion/iu);
  assert.match(report, /validation propriétaire/iu);
});
