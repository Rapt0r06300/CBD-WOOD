import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const lexiconSource = await readFile(new URL('../wood-advisor-lexicon.js', import.meta.url), 'utf8');
const engineSource = await readFile(new URL('../wood-advisor-engine.js', import.meta.url), 'utf8');

const loadEngine = () => {
  const context = { window: {}, console };
  context.globalThis = context;
  vm.runInNewContext(lexiconSource, context, { filename: 'wood-advisor-lexicon.js' });
  vm.runInNewContext(engineSource, context, { filename: 'wood-advisor-engine.js' });
  return { engine: context.window.WoodAdvisorEngine, lexicon: context.window.WoodAdvisorLexicon };
};

test('CRO-199 expose un lexique WOOD versionné et modifiable hors compilation', () => {
  const { engine, lexicon } = loadEngine();
  assert.match(lexicon.version, /^2026-11-07\./u);
  assert.ok(lexicon.notes.fruite.includes('fruité'));
  assert.ok(lexicon.intensity.high.includes('puissant'));
  assert.equal(engine.lexiconVersion(), lexicon.version);
  assert.deepEqual(engine.getLexicon().notes.fruite, lexicon.notes.fruite);
});

test('CRO-205 conserve phrase, motif, source et état de chaque correspondance', () => {
  const { engine } = loadEngine();
  const products = [{
    id: 'fleur-fruitee',
    name: 'Fleur fruitée',
    category: 'fleurs',
    facts: [{ key: 'notes', value: 'fruite', verified: true, source: 'owner-approved:fiche-wood-01' }],
  }];
  const preferences = engine.extractPreferences('Je cherche un goût fruité');
  const result = engine.recommend(products, preferences);
  assert.equal(result.status, 'match');
  assert.equal(JSON.stringify(result.best.trace), JSON.stringify([{
    phrase: 'Je cherche un goût fruité',
    motif: 'fruite',
    field: 'notes',
    source: 'owner-approved:fiche-wood-01',
    state: 'verified',
  }]));
});

test('CRO-208 mesure les phrases sensorielles sans faux positif critique', () => {
  const { engine } = loadEngine();
  const cases = [
    ['goût fruité', 'desiredNotes', 'fruite'],
    ['notes boisées', 'desiredNotes', 'boise'],
    ['pas fruité', 'excludeNotes', 'fruite'],
    ['sans goût terreux', 'excludeNotes', 'terreux'],
    ['puissant', 'needsClarification', true],
    ['pas trop fort', 'aromaIntensityMax', 'medium'],
    ['je ne sais pas', 'discovery', true],
    ['effet relaxant', 'blockedTopics', 'medical-effect'],
  ];
  const failures = cases.filter(([phrase, field, expected]) => {
    const preferences = engine.extractPreferences(phrase);
    if (field === 'desiredNotes' || field === 'excludeNotes' || field === 'blockedTopics') return !preferences[field].includes(expected);
    return preferences[field] !== expected;
  });
  assert.deepEqual(failures, [], 'Les phrases de validation ne doivent produire aucun faux positif critique');
});
