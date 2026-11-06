import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat des accents garde les stickers optionnels et les zones commerciales sobres', async () => {
  const contract = await readFile(new URL('../docs/design/wood-accents-contract.md', import.meta.url), 'utf8');
  const grammar = await readFile(new URL('../docs/design/wood-accent-grammar.md', import.meta.url), 'utf8');
  const direction = await readFile(new URL('../docs/design/wood-direction-register.md', import.meta.url), 'utf8');
  const visualLibrary = await readFile(new URL('../docs/design/wood-visual-library.md', import.meta.url), 'utf8');
  const responsive = await readFile(new URL('../responsive.css', import.meta.url), 'utf8');
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const visualGuardrails = await readFile(new URL('../test/public-visual-guardrails.test.mjs', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et intention',
    'Règles WOOD et zones interdites',
    'États, fallback et motion',
    'Responsive, accessibilité et sécurité',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.match(grammar, /premium, calme et lisible/iu);
  assert.match(grammar, /prix, stocks, grammages, boutons, formulaires, paiement, livraison et erreurs restent sobres/iu);
  assert.match(grammar, /ancré à son bloc, jamais au viewport/iu);
  assert.match(grammar, /formulation neutre de repli/iu);
  assert.match(grammar, /validation d’origine, de version et de droits/iu);
  assert.match(direction, /Un sticker, un emoji ou une image décorative ne porte jamais seul/iu);
  assert.match(direction, /aucun sticker n'est ancré au viewport/iu);
  for (const className of ['wood-accent-rule', 'wood-accent-frame', 'wood-sticker']) {
    assert.match(responsive, new RegExp(`\\.${className}`));
    assert.match(visualLibrary, new RegExp(className));
  }
  assert.match(responsive, /prefers-reduced-motion: reduce/);
  assert.match(responsive, /pointer-events: none/);
  assert.match(homepage, /wood-accent-rule/);
  assert.match(homepage, /Illustrations de démonstration/iu);
  assert.match(visualGuardrails, /widget ou une popup/iu);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
