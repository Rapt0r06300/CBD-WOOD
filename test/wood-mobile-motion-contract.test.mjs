import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat motion mobile WOOD fournit des équivalents tactiles et un repli reduced-motion', async () => {
  const contract = await readFile(new URL('../docs/design/wood-mobile-motion-contract.md', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  const mobile = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source de vérité',
    'Parcours tactile et interactions',
    'Motion mobile et bornes',
    'Reduced-motion, faible donnée et fallback',
    'Responsive, accessibilité et performance',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }

  assert.match(contract, /aucune (?:action essentielle|destination).*hover|hover.*aucune/iu);
  assert.match(contract, /touch|tactile/iu);
  assert.match(shell, /saveData/);
  assert.match(shell, /effectiveType/);
  assert.match(shell, /wood-low-data/);
  assert.match(shell, /prefers-reduced-motion: reduce/);
  assert.match(shell, /IntersectionObserver/);
  assert.match(shell, /wood:catalog-rendered/);
  assert.doesNotMatch(shell, /addEventListener\(['"](?:wheel|touchmove|scroll)['"][\s\S]{0,240}preventDefault/);

  assert.match(mobile, /@media \(max-width: 800px\)/);
  assert.match(mobile, /100svh/);
  assert.match(mobile, /env\(safe-area-inset-bottom/);
  assert.match(mobile, /min-height: 48px/);
  assert.match(mobile, /touch-action: manipulation/);
  assert.match(mobile, /@media \(hover: none\)[\s\S]*?\.product-card:hover[\s\S]*?transform: none/);
  assert.match(mobile, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?transition: none !important/);
  assert.match(boutique, /html\.wood-low-data[\s\S]*?transform:none/);
  assert.match(boutique, /@media\(prefers-reduced-motion:reduce\)[\s\S]*?transition:none!important/);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
