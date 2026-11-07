import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const detailPages = await Promise.all(['fleur.html', 'produit.html'].map(async (page) => [
  page,
  await readFile(new URL(`../${page}`, import.meta.url), 'utf8'),
]));
const control = await readFile(new URL('../docs/validation/2026-11-07-cro-078-source-visibility.md', import.meta.url), 'utf8').catch(() => '');

test('CRO-078 rend la source visible sans fabriquer de preuve laboratoire', () => {
  for (const [page, html] of detailPages) {
    assert.match(html, /quality-proof/iu, `${page} doit conserver la zone de preuve`);
    assert.match(html, /Aucune source vérifiée à afficher/iu, `${page} doit afficher l’état source manquante`);
    assert.doesNotMatch(html, /lab tested|laboratory tested|COA|certificat laboratoire/iu, `${page} ne doit pas publier une preuve non sourcée`);
  }
});

test('CRO-078 documente la porte de publication de la source', () => {
  for (const term of ['document vérifié', 'pending', 'COA générique', 'Source à fournir', 'lot', 'date']) {
    assert.match(control, new RegExp(term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'iu'));
  }
});

