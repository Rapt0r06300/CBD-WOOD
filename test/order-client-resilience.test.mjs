import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../order-api.js', import.meta.url), 'utf8');

test('la création de commande a un délai maximum et annule proprement la requête', () => {
  assert.match(source, /const ORDER_REQUEST_TIMEOUT_MS = 20000/);
  assert.match(source, /new AbortController\(\)/);
  assert.match(source, /controller\?\.abort\(\)/);
  assert.match(source, /signal: controller\.signal/);
  assert.match(source, /clearTimeout\(timeout\)/);
});

test('une panne réseau ne prétend pas avoir créé une commande et indique que le panier est conservé', () => {
  assert.match(source, /Connexion impossible\. Vérifie le réseau puis réessaie : ta sélection est conservée\./);
  assert.match(source, /Le service met trop de temps à répondre\. Réessaie : ta sélection est conservée\./);
  assert.match(source, /sessionStorage\.removeItem\(ORDER_IDEMPOTENCY_KEY\)/);
});
