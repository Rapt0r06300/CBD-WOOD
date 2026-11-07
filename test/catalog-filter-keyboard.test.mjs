import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const script = await readFile(new URL('../wood-catalog-search.js', import.meta.url), 'utf8');
const css = await readFile(new URL('../wood-catalog-search.css', import.meta.url), 'utf8');
const guide = await readFile(new URL('../docs/validation/2026-11-07-catalog-filter-keyboard.md', import.meta.url), 'utf8');

test('le panneau filtres possède un parcours clavier complet', () => {
  assert.match(script, /wood-catalog-search__filters-toggle/u);
  assert.match(script, /aria-expanded/u);
  assert.match(script, /Appliquer les filtres/u);
  assert.match(script, /Escape/u);
  assert.match(script, /focus\(\)/u);
  assert.match(script, /filtersPanel/u);
  assert.match(css, /wood-catalog-search__filters-panel/u);
  assert.match(css, /\.is-open/u);
  assert.match(guide, /retour du[\s\S]*focus/iu);
});
