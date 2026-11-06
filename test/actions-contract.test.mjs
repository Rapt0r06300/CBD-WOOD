import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat des actions publiques relie découvrir, boutique, compte et panier à des retours sûrs', async () => {
  const contract = await readFile(new URL('../docs/design/wood-actions-contract.md', import.meta.url), 'utf8');
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const navigation = await readFile(new URL('../test/navigation-accessibility.test.mjs', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et destinations',
    'États et retours',
    'Clavier, toucher et responsive',
    'Données et sécurité',
    'Preuve et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.match(homepage, /href="fleurs\.html"/);
  assert.match(homepage, /href="compte\.html"/);
  assert.match(homepage, /href="checkout\.html"/);
  assert.match(homepage, /aria-label="Descendre vers les univers WOOD"/);
  assert.match(navigation, /lastCartTrigger|lastMenuTrigger/u);
  assert.match(boutique, /role="dialog"/);
  assert.match(boutique, /aria-modal="true"/);
  assert.match(boutique, /aria-disabled/);
  assert.match(shell, /nav-menu-trigger/);
  assert.match(shell, /nav-menu-back/);
  assert.doesNotMatch(homepage, /href="admin\.html"/i);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
