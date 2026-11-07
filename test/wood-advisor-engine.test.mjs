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

test('les questions sont générées uniquement depuis les candidats et faits vérifiés', () => {
  const engine = loadEngine();
  const withoutFacts = [
    { id: 'fleur-1', category: 'fleurs', facts: [] },
    { id: 'resine-1', category: 'resines', facts: [] },
  ];
  const categoryPlan = engine.buildQuestionPlan(withoutFacts);
  assert.equal(categoryPlan[0].key, 'category');
  assert.deepEqual(Array.from(categoryPlan[0].choices), ['fleurs', 'resines']);
  assert.doesNotMatch(JSON.stringify(categoryPlan), /effet|sommeil|douleur|médic/iu);

  const withFacts = [
    {
      id: 'fleur-1',
      category: 'fleurs',
      facts: [{ key: 'notes', value: 'fruite', verified: true, source: 'owner-approved:demo-1' }],
    },
    {
      id: 'fleur-2',
      category: 'fleurs',
      facts: [{ key: 'notes', value: 'terreux', verified: true, source: 'owner-approved:demo-2' }],
    },
  ];
  const plan = engine.buildQuestionPlan(withFacts);
  assert.ok(plan.some((question) => question.key === 'notes'));
  assert.equal(engine.nextQuestion(withFacts, engine.extractPreferences(''), {}).key, 'category');
  assert.equal(engine.nextQuestion(withFacts, engine.extractPreferences('fleurs'), { category: 'fleurs' }).key, 'notes');
});

test('les ambiguïtés et conflits deviennent une file de contrôle lisible', () => {
  const engine = loadEngine();
  const ambiguities = engine.collectAmbiguities([
    { id: 'missing', category: 'fleurs', facts: [] },
    { id: 'conflict', category: 'fleurs', facts: [
      { key: 'notes', value: 'fruite', verified: true, source: 'owner-approved:a' },
      { key: 'notes', value: 'terreux', verified: true, source: 'owner-approved:b' },
    ] },
    { id: 'unproven', category: 'fleurs', facts: [{ key: 'aromaIntensity', value: 'high', verified: false, source: null }] },
  ]);
  assert.ok(ambiguities.some((item) => item.reason === 'missing-critical' && item.entityId === 'missing'));
  assert.ok(ambiguities.some((item) => item.reason === 'conflict' && item.entityId === 'conflict'));
  assert.ok(ambiguities.some((item) => item.reason === 'unproven' && item.entityId === 'unproven'));
});

test('les combinaisons usuelles restent bornées et déterministes', () => {
  const engine = loadEngine();
  const products = [
    { id: 'a', category: 'fleurs', facts: [{ key: 'notes', value: 'fruite', verified: true, source: 'owner:a' }] },
    { id: 'b', category: 'resines', facts: [{ key: 'notes', value: 'terreux', verified: true, source: 'owner:b' }] },
  ];
  const questions = ['fleurs', 'résines', 'je ne sais pas', 'un goût fruité', 'pas fruité', 'puissant', 'effet relaxant', ''];
  for (const question of questions) {
    const preferences = engine.extractPreferences(question);
    const first = engine.recommend(products, preferences);
    const second = engine.recommend(products, preferences);
    assert.deepEqual(first, second);
    assert.ok(['match', 'discovery', 'no-match', 'clarify'].includes(first.status));
    assert.ok((first.alternatives || []).length <= 2);
  }
});
