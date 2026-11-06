import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const contact = await readFile(new URL('../contact.html', import.meta.url), 'utf8');

test('le jeu d’icônes WOOD couvre les actions sans remplacer leurs libellés', () => {
  for (const name of ['home', 'catalog', 'pin', 'cart', 'account', 'store', 'phone', 'directions', 'delivery', 'faq']) {
    assert.match(shell, new RegExp(`${name}:`, 'u'), `icône manquante : ${name}`);
  }
  assert.match(shell, /aria-hidden.*true/u);
  assert.match(shell, /stroke-width.*1\.8/u);
  assert.match(shell, /hydrateWoodIcons/u);
  assert.match(homepage, /data-wood-icon="directions"/u);
  assert.match(homepage, /data-wood-icon="phone"/u);
  assert.match(contact, /data-wood-icon="faq"/u);
  assert.match(contact, /data-wood-icon="store"/u);
});
