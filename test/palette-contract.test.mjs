import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat palette distingue les tokens WOOD des surfaces dérivées', async () => {
  const contract = await readFile(new URL('../docs/design/wood-palette-contract.md', import.meta.url), 'utf8');
  const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const direction = await readFile(new URL('../docs/design/wood-direction-register.md', import.meta.url), 'utf8');

  for (const heading of ['Palette source', 'Tokens de production', 'Surfaces dérivées', 'Contrôles et rollback']) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  for (const token of ['--bg:#101610', '--ink:#f1f0e6', '--muted:#abb3a3', '--line:#344338', '--lime:#cbf096', '--wood:#d8d4bd', '--pine:#1b2c20', '--card:#1d281e', '--soft:#e8e7d7', '--font:Arial,Helvetica,sans-serif']) {
    assert.match(stylesheet, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(contract, /aucune couleur TealerLab|aucune couleur étrangère/u);
  assert.match(contract, /reduced-motion/iu);
  assert.match(contract, /retour arrière|rollback/iu);
  assert.match(direction, /Aucune couleur TealerLab/);
});
