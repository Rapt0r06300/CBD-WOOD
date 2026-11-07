import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const boutique = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');
const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
const motion = await readFile(new URL('../wood-motion.js', import.meta.url), 'utf8');
const mobileFinish = await readFile(new URL('../wood-mobile-finish.js', import.meta.url), 'utf8');
const evidence = await readFile(new URL('../docs/validation/2026-11-07-network-resilience.md', import.meta.url), 'utf8');

test('la démo possède un repli local pour les parcours ralentis et interrompus', () => {
  assert.match(boutique, /wood-cart-v1/u);
  assert.match(shell, /saveData|effectiveType/u);
  assert.match(motion, /saveData|effectiveType/u);
  assert.match(mobileFinish, /saveData|effectiveType/u);
  for (const term of ['ralenti', 'rechargement', 'hors ligne', 'retour navigateur', 'localStorage']) {
    assert.match(evidence, new RegExp(term, 'iu'));
  }
  assert.match(evidence, /passage observé/u);
});
