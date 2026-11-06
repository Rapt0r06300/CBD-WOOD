import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat contenu-données relie chaque source WOOD à son usage public', async () => {
  const contract = await readFile(new URL('../docs/design/wood-content-data-contract.md', import.meta.url), 'utf8');

  for (const heading of [
    'Source de vérité',
    'Contrat produit public',
    'États de disponibilité',
    'Médias et contenu éditorial',
    'Frontière d’achat'
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }

  assert.match(contract, /Supabase.*produits, stocks, commandes/u);
  assert.match(contract, /availability_state/);
  assert.match(contract, /demo.*approved|approved.*demo/u);
  assert.match(contract, /prix.*stock.*disponibilité/u);
  assert.match(contract, /ne doit pas inventer/u);
  assert.match(contract, /prix.*promotion/u);
  assert.match(contract, /Viva Wallet.*désactivé/u);
});
