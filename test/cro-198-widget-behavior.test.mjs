import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [widget, styles, pagesBuild, evidence] = await Promise.all([
  readFile(new URL('../wood-advisor.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-advisor.css', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/prepare-github-pages.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../docs/validation/2026-11-07-cro-198-widget-behavior.md', import.meta.url), 'utf8'),
]);

test('CRO-198 borne les ouvertures, fermetures et répétitions du widget', () => {
  assert.match(widget, /bubble\.addEventListener\('click'/u);
  assert.match(widget, /closeButton\.addEventListener\('click'/u);
  assert.match(widget, /panel\.hidden = false/u);
  assert.match(widget, /panel\.hidden = true/u);
  assert.match(widget, /event\.key === 'Escape'/u);
  assert.match(widget, /IntersectionObserver/u);
  assert.match(styles, /pointer-events:s*none/u);
  assert.match(styles, /\.wood-advisor__bubble,\.wood-advisor__panel\{pointer-events:auto\}/u);
});

test('CRO-198 conserve une entrée directe de démo et une preuve de recette mobile', () => {
  assert.match(pagesBuild, /wood-advisor-lexicon\.js/u);
  assert.match(pagesBuild, /wood-advisor\.js/u);
  for (const term of ['URL directe', 'double-clic', '390×844', 'défilement', '0 échec']) assert.match(evidence, new RegExp(term, 'u'));
});
