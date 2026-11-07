import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const read = file => readFile(resolve(root, file), 'utf8');

test('le conseil lié à une fiche transmet seulement le nom public', async () => {
  const actions = await read('wood-product-actions.js');
  const prefill = await read('wood-contact-prefill.js');
  assert.match(actions, /contact\.html\?produit=/);
  assert.match(actions, /product\.name/);
  assert.match(prefill, /URLSearchParams/);
  assert.match(prefill, /maxlength|length > 120/);
  assert.doesNotMatch(prefill, /fetch\(|XMLHttpRequest|sendBeacon/);
});

test('le formulaire de contact charge le préremplissage local', async () => {
  const page = await read('contact.html');
  const manifest = await read('scripts/prepare-hostinger.mjs');
  assert.match(page, /wood-contact-prefill\.js/);
  assert.match(manifest, /'wood-contact-prefill\.js'/);
});
