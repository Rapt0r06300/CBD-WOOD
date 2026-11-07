import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const checklist = await readFile(new URL('../docs/validation/2026-11-07-owner-validation-checklist.md', import.meta.url), 'utf8');

test('la checklist propriétaire sépare validation humaine et suppositions', () => {
  for (const label of ['Identité', 'Ambiance', 'Médias', 'Graffitis', 'Produits', 'Mobile', 'Texte', 'Limites']) {
    assert.match(checklist, new RegExp(`\\*\\*${label}\\*\\*`, 'u'));
  }
  assert.match(checklist, /ne vaut pas approbation/iu);
  assert.match(checklist, /garder \/ adapter \/ retirer/iu);
  assert.match(checklist, /Aucun choix n'est présumé/iu);
});
