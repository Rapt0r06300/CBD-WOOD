import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('owner login identifies the e-mail field as the username', async () => {
  const adminPage = await readFile(new URL('../admin.html', import.meta.url), 'utf8');

  assert.match(
    adminPage,
    /id="loginEmail" name="username" type="email" autocomplete="username"/,
    'le champ e-mail de connexion propriétaire doit être identifiable par les gestionnaires de mots de passe',
  );
});
