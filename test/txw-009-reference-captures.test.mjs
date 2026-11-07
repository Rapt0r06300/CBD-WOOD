import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [evidence, roadmap] = await Promise.all([
  readFile(new URL('../docs/validation/2026-11-07-txw-009-reference-captures.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('TXW-009 conserve une référence visuelle par route et viewport', () => {
  for (const route of ['index.html', 'fleurs.html', 'resines.html', 'bien-etre.html', 'wood-shop.html', 'fleur.html', 'produit.html', 'compte.html', 'checkout.html', 'contact.html', 'confirmation.html', '404.html', 'rendez-vous.html']) {
    assert.match(evidence, new RegExp(route.replace('.', '\\.'), 'u'));
  }
  for (const viewport of ['390 × 844', '1440 × 900']) assert.match(evidence, new RegExp(viewport.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'u'));
  assert.match(evidence, /menu fermé/u);
  assert.match(evidence, /menu mobile ouvert/u);
  assert.match(evidence, /panier local vide/u);
  assert.match(evidence, /17a3c42/u);
  assert.match(roadmap, /^- \[x\] \*\*TXW-009 —/mu);
});
