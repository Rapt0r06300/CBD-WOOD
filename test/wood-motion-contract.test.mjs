import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat motion WOOD borne les animations desktop et leurs replis', async () => {
  const contract = await readFile(new URL('../docs/design/wood-motion-contract.md', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const mobile = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  const guardrails = await readFile(new URL('../test/motion-guardrails.test.mjs', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et intention',
    'Transitions et interactions',
    'Reduced-motion, faible donnée et fallback',
    'Responsive, accessibilité et performance',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.match(boutique, /\.product-card:hover\{transform:translateY\(-5px\)/);
  assert.match(boutique, /\.product-art img\{[^}]*transition:transform \.45s/);
  assert.match(boutique, /\.product-zoom-clone\{[^}]*transform:[^}]*will-change:transform/);
  assert.match(boutique, /@media\(prefers-reduced-motion:reduce\)[\s\S]*?transition:none!important/);
  assert.match(shell, /IntersectionObserver/);
  assert.match(shell, /prefers-reduced-motion: reduce/);
  assert.match(shell, /wood-low-data/);
  assert.doesNotMatch(shell, /addEventListener\(['"](?:wheel|touchmove|scroll)['"][\s\S]{0,240}preventDefault/);
  assert.match(mobile, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?transition:\s*none !important/);
  assert.match(guardrails, /les animations WOOD restent composées et bornées/iu);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
