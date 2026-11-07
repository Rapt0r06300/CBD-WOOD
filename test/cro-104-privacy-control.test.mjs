import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const control = await readFile(new URL('../docs/validation/2026-11-07-cro-104-privacy-control.md', import.meta.url), 'utf8').catch(() => '');
const privacyTest = await readFile(new URL('./privacy-surface.test.mjs', import.meta.url), 'utf8');

test('CRO-104 garde la démo sans traceur et encadre toute mesure future', () => {
  for (const term of ['aucun traceur non essentiel', 'consentement', 'base légale', 'IP', 'pending', 'suppression']) {
    assert.match(control, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(control, /aucune mesure future n’est activée/iu);
  assert.match(privacyTest, /traceur|cookie/iu);
});
