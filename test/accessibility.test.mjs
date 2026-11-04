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
