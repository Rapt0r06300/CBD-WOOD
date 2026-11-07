import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const matrix = await readFile(new URL('../docs/validation/2026-11-07-cro-097-regulatory-category-matrix.md', import.meta.url), 'utf8').catch(() => '');

test('CRO-097 sépare chaque famille et bloque la publication sans validation', () => {
  for (const category of ['Fleurs', 'Résines', 'Huiles', 'Cosmétiques', 'Comestibles', 'Accessoires']) {
    assert.match(matrix, new RegExp(category, 'iu'));
  }
  for (const term of ['statut légal à vérifier', 'cas par cas', 'bloqueur publication', 'propriétaire', 'conseil juridique', 'pending']) {
    assert.match(matrix, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(matrix, /Aucune catégorie n’est autorisée à passer en production/u);
});
