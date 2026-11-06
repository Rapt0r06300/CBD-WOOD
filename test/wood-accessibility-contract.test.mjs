import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat accessibilité WOOD protège clavier, lecteur d’écran, contraste et toucher', async () => {
  const contract = await readFile(new URL('../docs/design/wood-accessibility-contract.md', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  const storefront = await readFile(new URL('../storefront.js', import.meta.url), 'utf8');
  const boutiqueStyles = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const mobileStyles = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  const account = await readFile(new URL('../compte.html', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et niveaux',
    'Clavier, focus et navigation',
    'Lecteur d’écran, contenu et états',
    'Contraste, toucher et responsive',
    'Motion, fallback et sécurité',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }

  assert.match(boutique, /role="dialog"/);
  assert.match(boutique, /aria-modal="true"/);
  assert.match(boutique, /lastCartTrigger/);
  assert.match(boutique, /\.focus\(/);
  assert.match(shell, /aria-expanded/);
  assert.match(shell, /aria-controls/);
  assert.match(shell, /focus\(\{ preventScroll: true \}\)/);
  assert.match(shell, /Escape/);
  assert.match(storefront, /Rupture de stock/);
  assert.match(storefront, /Disponibilité à confirmer/);
  assert.match(boutiqueStyles, /:focus-visible/);
  assert.match(boutiqueStyles, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(mobileStyles, /@media \(any-pointer: coarse\)[\s\S]*?min-width: 44px/);
  assert.match(mobileStyles, /min-height: 48px/);
  assert.match(mobileStyles, /env\(safe-area-inset-bottom/);
  assert.match(account, /id="account-email" name="email" type="email" autocomplete="username"/);
  assert.match(account, /name="username"[\s\S]*?autocomplete="username"/);
  assert.doesNotMatch(account, /href="admin\.html"/i);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
