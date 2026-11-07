import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../wood-advisor-engine.js', import.meta.url), 'utf8');
const loadEngine = () => {
  const context = { window: {}, console };
  context.globalThis = context;
  vm.runInNewContext(source, context, { filename: 'wood-advisor-engine.js' });
  return context.window.WoodAdvisorEngine;
};

test('la recommandation expose deux alternatives et des badges fondés sur les faits vérifiés', () => {
  const engine = loadEngine();
  const products = [
    { id: 'best', name: 'Best', category: 'fleurs', facts: [
      { key: 'aromaIntensity', value: 'high', verified: true, source: 'fiche:best' },
      { key: 'notes', value: 'fruite', verified: true, source: 'fiche:best' },
    ] },
    { id: 'alt-one', name: 'Alt One', category: 'fleurs', facts: [{ key: 'notes', value: 'fruite', verified: true, source: 'fiche:alt-one' }] },
    { id: 'alt-two', name: 'Alt Two', category: 'fleurs', facts: [{ key: 'aromaIntensity', value: 'high', verified: true, source: 'fiche:alt-two' }] },
    { id: 'unverified', name: 'Unverified', category: 'fleurs', facts: [{ key: 'notes', value: 'terreux', verified: false, source: 'à contrôler' }] },
  ];
  const result = engine.recommend(products, engine.extractPreferences('goût fruité et fort'));
  assert.equal(result.status, 'match');
  assert.equal(result.alternatives.length, 2);
  assert.ok(result.best.badges.length >= 1);
  assert.ok(result.alternatives.every((item) => Array.isArray(item.badges)));
  assert.ok(result.best.badges.every((badge) => badge.source && badge.label && badge.reason));
  assert.equal(result.alternatives.some((item) => item.product.id === 'unverified'), false);
});
