import test from 'node:test';
import assert from 'node:assert/strict';
import { collectAdvisorInventory } from '../scripts/inventory-wood-advisor.mjs';

test('l’inventaire extrait seulement des faits littéraux avec leur source', async () => {
  const inventory = await collectAdvisorInventory();
  assert.ok(inventory.length >= 19);
  const flower = inventory.find(item => item.id === 'fleurs-nimbus-3000');
  assert.ok(flower);
  assert.ok(flower.facts.some(fact => fact.key === 'profile' && fact.status === 'verified'));
  assert.ok(flower.facts.some(fact => fact.key === 'description' && fact.source.file === 'fleurs.html'));
  assert.ok(flower.facts.every(fact => fact.source.selector.includes('data-product-id')));
  assert.ok(flower.facts.every(fact => typeof fact.source.excerpt === 'string' && fact.source.excerpt.length > 0));
});

test('l’extraction ne fabrique pas de faits sensoriels', async () => {
  const inventory = await collectAdvisorInventory();
  const keys = new Set(inventory.flatMap(item => item.facts.map(fact => fact.key)));
  assert.equal(keys.has('notes'), false);
  assert.equal(keys.has('aromaIntensity'), false);
  assert.equal(keys.has('effect'), false);
});
