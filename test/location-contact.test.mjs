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
  const faqCopy = homepage.replace(/<section[^>]+id="packs"[\s\S]*?<\/section>/iu, '');
  assert.doesNotMatch(faqCopy, /compte à rebours|fidélité|voucher|promotion/i);
  assert.match(homepage, /data-voucher-state="inactive"/u);
});

test('le pied de page associe toujours les deux boutiques et leurs numéros', async () => {
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  assert.match(shell, /tel:\+33422163570/);
  assert.match(shell, /tel:\+33423130305/);
  assert.match(shell, /Borriglione · 04 23 13 03 05/);
  assert.match(shell, /16 avenue Alfred Borriglione, 06100 Nice/);
});
