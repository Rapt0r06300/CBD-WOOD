import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const plan = await readFile(new URL('../docs/validation/2026-11-07-discovery-funnel.md', import.meta.url), 'utf8');

test('le parcours de découverte démo relie univers, fiche et visite sans achat', () => {
  assert.match(homepage, /href="#univers"/u);
  assert.match(homepage, /href="fleurs\.html"/u);
  assert.match(homepage, /href="fleur\.html\?produit=fleurs-/u);
  assert.match(homepage, /href="tel:/u);
  assert.match(homepage, /google\.com\/maps/u);
  assert.match(plan, /entrée[\s\S]*univers[\s\S]*fiche[\s\S]*téléphone[\s\S]*itinéraire/iu);
  assert.doesNotMatch(plan, /achat réel|commande réelle|conversion enregistrée/iu);
});
