import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const board = await readFile(new URL('../docs/design/wood-visual-direction-board-2026-11-07.md', import.meta.url), 'utf8');
const matrix = await readFile(new URL('../docs/validation/2026-11-07-content-approval-matrix.md', import.meta.url), 'utf8');

test('la planche visuelle sépare brief, proposition et attente', () => {
  for (const term of ['Approuvé — brief', 'Proposé', 'À fournir', 'Hero', 'Carte fleurs', 'Sticker / graffiti', '390 px', '1440 px']) {
    assert.match(board, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'u'));
  }
  assert.match(board, /aria-hidden="true"/u);
});

test('la matrice de contenus garde les données commerciales derrière une source', () => {
  for (const term of ['Fleurs', 'Résines', 'Bien-être', 'WOOD Shop', 'Avis Google', 'Qualité / laboratoire', 'source WOOD', 'approved']) {
    assert.match(matrix, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(matrix, /Aucun statut n'autorise[\s\S]*prix[\s\S]*stock[\s\S]*avis/u);
});
