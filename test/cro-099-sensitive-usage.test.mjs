import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const publicPages = [
  'index.html',
  'fleurs.html',
  'resines.html',
  'bien-etre.html',
  'wood-shop.html',
  'fleur.html',
  'produit.html',
  'checkout.html',
  'contact.html',
  'compte.html',
  'confirmation.html',
];

const pages = await Promise.all(publicPages.map(async (page) => [
  page,
  await readFile(new URL(`../${page}`, import.meta.url), 'utf8'),
]));
const control = await readFile(new URL('../docs/validation/2026-11-07-cro-099-sensitive-usage.md', import.meta.url), 'utf8').catch(() => '');

test('CRO-099 retire les encouragements sensibles et les garanties absolues', () => {
  const forbiddenClaims = /(?:sans aucun risque|zéro risque|sans danger|inoffensif|garanti sans risque|guérit|soigne|remède miracle)/iu;
  for (const [page, html] of pages) {
    assert.doesNotMatch(html, forbiddenClaims, `${page} ne doit pas porter de promesse sensible`);
  }
  for (const term of ['usage interdit', 'sécurité absolue', 'aucun encouragement', 'pending', 'revue juridique']) {
    assert.match(control, new RegExp(term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'iu'));
  }
});

