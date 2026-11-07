import assert from 'node:assert/strict';
import test from 'node:test';
import { buildAdvisorIndex } from '../scripts/build-wood-advisor-index.mjs';

const lexicon = {
  version: '2026-11-07.1',
  notes: { fruite: ['fruité'], boise: ['boisé'] },
  intensity: { high: ['fort'], low: ['doux'] },
};

const inventory = [
  {
    slug: 'demo-a', name: 'Demo A', category: 'fleurs', sourceFile: 'fleurs.html',
    facts: [{ key: 'description', value: 'Profil fruité et fort.', source: { file: 'fleurs.html', selector: '#a', excerpt: 'Profil fruité et fort.' } }],
  },
  {
    slug: 'demo-a', name: 'Demo A doublon', category: 'fleurs', sourceFile: 'fleurs.html',
    facts: [{ key: 'description', value: 'doublon', source: { file: 'fleurs.html', selector: '#a2', excerpt: 'doublon' } }],
  },
  {
    slug: 'demo-b', name: 'Demo B', category: 'resines', sourceFile: 'resines.html',
    facts: [{ key: 'profile', value: 'Doux et boisé.', source: { file: 'resines.html', selector: '#b', excerpt: 'Doux et boisé.' } }],
  },
];

test('CRO-219 déduplique une entrée produit et garde une source pour chaque extraction', () => {
  const result = buildAdvisorIndex(inventory, lexicon);
  assert.deepEqual(result.products.map((product) => product.slug), ['demo-a', 'demo-b']);
  assert.ok(result.attributeEvidence.some((entry) => entry.productSlug === 'demo-a' && entry.attributeValue === 'fruite'));
  assert.ok(result.attributeEvidence.every((entry) => entry.source && entry.status === 'needs_review' && entry.publishedAs === 'hidden'));
  assert.ok(result.badgeRules.length >= 2);
  assert.ok(result.questions.some((question) => question.key === 'notes'));
});

test('CRO-219 est idempotent et ne fabrique aucun contenu commercial', () => {
  const first = buildAdvisorIndex(inventory, lexicon);
  const second = buildAdvisorIndex(inventory, lexicon);
  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal(first.import.status, 'review-required');
  assert.equal(first.import.commercialWrites, false);
  assert.doesNotMatch(JSON.stringify(first), /customer|order|payment|price|stock/iu);
  assert.equal(first.checksum.length, 64);
});
