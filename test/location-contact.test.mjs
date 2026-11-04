import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('les boutiques et leurs numéros sont identifiables dans l’accueil', async () => {
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(homepage, /<h3>BARLA<\/h3>/);
  assert.match(homepage, /<h3>BORRIGLIONE<\/h3>/);
  assert.doesNotMatch(homepage, /<h3>BARLA\.<\/h3>|<h3>BORRIGLIONE\.<\/h3>/);
  assert.match(homepage, />Barla · 04 22 16 35 70<\/a>/);
  assert.match(homepage, />Borriglione · 04 23 13 03 05<\/a>/);
});

test('la FAQ reste courte, sûre et cohérente avec les décisions de commande', async () => {
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(homepage, /La livraison est-elle disponible \?/);
  assert.match(homepage, /Les frais, zones et délais seront précisés/);
  assert.match(homepage, /le paiement en ligne Viva sera activé séparément/);
  assert.match(homepage, /Une commande peut être enregistrée en invité/);
  assert.doesNotMatch(homepage, /compte à rebours|fidélité|voucher|promotion/i);
});
