import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [detail, styles, evidence, roadmap] = await Promise.all([
  readFile(new URL('../product-detail.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-product-actions.css', import.meta.url), 'utf8'),
  readFile(new URL('../docs/validation/2026-11-07-cro-107-mobile-detail-action-bar.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('CRO-107 crée les deux actions mobiles de la fiche sans faux achat', () => {
  assert.match(detail, /data-wood-detail-actions/u);
  assert.match(detail, /contact\.html\?produit=/u);
  assert.match(detail, /index\.html#boutique/u);
  assert.match(detail, /Poser une question/u);
  assert.match(detail, /Voir en boutique/u);
});

test('CRO-107 place la barre au-dessus de la navigation mobile et respecte les safe areas', () => {
  assert.match(styles, /\.wood-detail-actions\{[^}]*display:none/u);
  assert.match(styles, /position:fixed/u);
  assert.match(styles, /bottom:calc\(var\(--wood-mobile-bar-height\) \+ var\(--wood-safe-bottom\)\)/u);
  assert.match(styles, /body\.has-wood-detail-actions/u);
  assert.match(styles, /min-height:44px/u);
  assert.match(styles, /prefers-reduced-motion:reduce/u);
});

test('CRO-107 documente la recette mobile et clôture la ligne de feuille de route', () => {
  assert.match(roadmap, /\[x\] \*\*CRO-107/u);
  for (const term of ['320', '375', '390', '430', 'safe area', 'aucun recouvrement']) {
    assert.match(evidence, new RegExp(term, 'iu'));
  }
});
