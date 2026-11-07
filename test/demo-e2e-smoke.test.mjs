import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const report = await readFile(new URL('../docs/validation/2026-11-07-demo-e2e-smoke.md', import.meta.url), 'utf8');
const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const flowers = await readFile(new URL('../fleurs.html', import.meta.url), 'utf8');
const flower = await readFile(new URL('../fleur.html', import.meta.url), 'utf8');
const checkout = await readFile(new URL('../checkout.html', import.meta.url), 'utf8');

test('le smoke test e2e de la démo couvre le parcours sans action commerciale', () => {
  for (const step of ['accueil', 'catalogue fleurs', 'fiche fleur', 'itinéraire', 'checkout']) {
    assert.match(report, new RegExp(step, 'iu'));
  }
  assert.match(homepage, /href="fleurs\.html"/u);
  assert.match(flowers, /wood-catalog-search|data-catalog-search/iu);
  assert.match(flower, /flower-detail|data-flower-view-toggle/iu);
  assert.match(checkout, /demo|simulation|disabled/iu);
  assert.match(report, /ne crée aucun compte,[\s\S]*ordre,[\s\S]*paiement[\s\S]*e-mail/iu);
});
