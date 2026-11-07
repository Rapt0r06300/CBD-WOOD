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

test('toutes les combinaisons de réponse restent bornées, déterministes et sans faux produit', () => {
  const engine = loadEngine();
  const products = [
    { id: 'fruit-soft', category: 'fleurs', facts: [
      { key: 'notes', value: 'fruite', verified: true, source: 'fixture:fruit-soft' },
      { key: 'aromaIntensity', value: 'low', verified: true, source: 'fixture:fruit-soft' },
    ] },
    { id: 'earth-strong', category: 'fleurs', facts: [
      { key: 'notes', value: 'terreux', verified: true, source: 'fixture:earth-strong' },
      { key: 'aromaIntensity', value: 'high', verified: true, source: 'fixture:earth-strong' },
    ] },
    { id: 'resin-strong', category: 'resines', facts: [
      { key: 'notes', value: 'boise', verified: true, source: 'fixture:resin-strong' },
      { key: 'aromaIntensity', value: 'high', verified: true, source: 'fixture:resin-strong' },
    ] },
  ];
  const prompts = [
    '', 'je ne sais pas', 'fleurs', 'résines', 'goût fruité', 'pas fruité',
    'goût terreux et fort', 'pas trop fort', 'plutôt doux', 'puissant',
    'effet relaxant', 'fleurs goût fruité fort', 'résines boisé', 'aucune idée',
  ];
  for (const prompt of prompts) {
    const first = engine.recommend(products, engine.extractPreferences(prompt));
    const second = engine.recommend(products, engine.extractPreferences(prompt));
    assert.deepEqual(first, second, prompt);
    assert.ok(['match', 'discovery', 'no-match', 'clarify'].includes(first.status), prompt);
    assert.ok((first.alternatives || []).length <= 2, prompt);
    assert.ok(!first.best || products.some((product) => product.id === first.best.product.id), prompt);
    for (const alternative of first.alternatives || []) assert.ok(products.some((product) => product.id === alternative.product.id), prompt);
  }
});
