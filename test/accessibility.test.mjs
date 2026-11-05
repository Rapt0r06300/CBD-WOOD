import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('customer login identifies the e-mail field for password managers', async () => {
  const accountPage = await readFile(new URL('../compte.html', import.meta.url), 'utf8');

  assert.match(
    accountPage,
    /id="account-email" name="email" type="email" autocomplete="email"/,
    'le champ e-mail du compte doit être identifiable par les gestionnaires de mots de passe',
  );
});

test('les états critiques restent compréhensibles sans dépendre de la couleur', async () => {
  const storefront = await readFile(new URL('../storefront.js', import.meta.url), 'utf8');
  const mobileStyles = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');

  assert.match(storefront, /Rupture de stock/);
  assert.match(storefront, /Bientôt disponible/);
  assert.match(storefront, /Disponibilité à confirmer/);
  assert.match(storefront, /Prix à confirmer/);
  assert.match(storefront, /product-status/);
  assert.match(mobileStyles, /\.btn,[\s\S]*?min-height: 48px/);
  assert.match(mobileStyles, /@media \(any-pointer: coarse\)[\s\S]*?min-width: 44px/);
});
