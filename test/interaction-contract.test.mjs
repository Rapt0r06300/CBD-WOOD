import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat d’interaction garde une action commerciale déterministe et accessible', async () => {
  const contract = await readFile(new URL('../docs/design/wood-interaction-contract.md', import.meta.url), 'utf8');

  for (const heading of [
    'Parcours principal',
    'Interactions par état',
    'Équivalents clavier et tactile',
    'Reduced-motion et résilience',
    'Preuve et retour arrière'
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }

  assert.match(contract, /découverte.*sélection.*panier.*checkout/u);
  assert.match(contract, /hover.*focus.*toucher/u);
  assert.match(contract, /prix.*stock.*validés/u);
  assert.match(contract, /prefers-reduced-motion/);
  assert.match(contract, /double|idempot/iu);
  assert.match(contract, /Aucune capture du scroll/u);
});
