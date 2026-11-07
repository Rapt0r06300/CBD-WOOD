import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(new URL('../wood-advisor-engine.js', import.meta.url), 'utf8').catch(() => '');
const loadEngine = () => {
  const context = { window: {}, console };
  context.globalThis = context;
  vm.runInNewContext(source, context, { filename: 'wood-advisor-engine.js' });
  return context.window.WoodAdvisorEngine;
};

test('le moteur normalise le français et garde le lexique sensoriel hors du médical', () => {
  assert.notEqual(source, '', 'wood-advisor-engine.js doit exister avant son intégration');
  const engine = loadEngine();
  assert.equal(engine.normalizeText('  Très   Fruité ! '), 'tres fruite');
  const preferences = engine.extractPreferences('Je cherche un goût fort, mais pas trop puissant et pas fruité.');
  assert.equal(preferences.aromaIntensity, 'high');
  assert.equal(preferences.aromaIntensityMax, 'medium');
  assert.deepEqual(Array.from(preferences.excludeNotes), ['fruite']);
  assert.equal('medical' in preferences, false);
  assert.equal(preferences.blockedTopics.length, 0);
});

test('les négations, l’ambiguïté de puissant et les demandes d’effet restent honnêtes', () => {
  const engine = loadEngine();
  const ambiguous = engine.extractPreferences('Je veux quelque chose de puissant.');
  assert.equal(ambiguous.needsClarification, true);
  assert.equal(ambiguous.aromaIntensity, null);

  const blocked = engine.extractPreferences('Je cherche un effet relaxant pour dormir.');
  assert.ok(blocked.blockedTopics.length > 0);
  assert.equal(blocked.aromaIntensity, null);
});

test('le classement est stable, justifiable et refuse les faits non vérifiés', () => {
  const engine = loadEngine();
  const products = [
    { id: 'a', name: 'A', slug: 'a', category: 'fleurs', facts: [{ key: 'aromaIntensity', value: 'high', verified: true, source: 'fiche WOOD 2026-11-07' }] },
    { id: 'b', name: 'B', slug: 'b', category: 'fleurs', facts: [{ key: 'notes', value: 'fruite', verified: true, source: 'fiche WOOD 2026-11-07' }] },
    { id: 'c', name: 'C', slug: 'c', category: 'fleurs', facts: [{ key: 'notes', value: 'fruite', verified: false, source: 'à contrôler' }] },
  ];
  const preferences = engine.extractPreferences('Je veux quelque chose de fruité.');
  const result = engine.recommend(products, preferences);
  assert.equal(result.status, 'match');
  assert.equal(result.best.product.id, 'b');
  assert.match(result.best.explanation, /source|vérifi/i);
  assert.equal(result.alternatives.some((item) => item.product.id === 'c'), false);
  assert.deepEqual(engine.recommend(products, preferences), result);
});

test('aucun match produit ne devient une promesse : la sortie reste utile', () => {
  const engine = loadEngine();
  const result = engine.recommend([{ id: 'a', name: 'A', slug: 'a', category: 'fleurs', facts: [] }], engine.extractPreferences('Je veux du fruité.'));
  assert.equal(result.status, 'no-match');
  assert.equal(result.best, null);
  assert.match(result.reason, /contact|correspond/i);
});
