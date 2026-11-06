import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const template = await readFile(new URL('../docs/ops/legal-content-template.md', import.meta.url), 'utf8');

test('le gabarit légal reste interne et bloque toute publication sans validation', () => {
  assert.match(template, /DOCUMENT INTERNE — À NE PAS PUBLIER/u);
  for (const field of ['raison sociale', 'SIRET', 'mentions légales', 'CGV', 'confidentialité', 'livraison', 'retours', 'source', 'validation propriétaire']) {
    assert.match(template, new RegExp(field, 'iu'));
  }
  assert.match(template, /aucun lien légal public/u);
  assert.match(template, /statut `approved`/u);
});
