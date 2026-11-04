import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');

test('le panier gère son dialogue et rend le focus au déclencheur', () => {
  assert.match(boutique, /role="dialog"/);
  assert.match(boutique, /aria-modal="true"/);
  assert.match(boutique, /lastCartTrigger/);
  assert.match(boutique, /\.focus\(/);
});

test('le menu mobile conserve le focus et son état accessible', () => {
  assert.match(boutique, /lastMenuTrigger/);
  assert.match(boutique, /nav\.focus\(/);
  assert.match(shell, /aria-label/);
});
