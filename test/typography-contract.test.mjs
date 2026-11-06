import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat typographique WOOD protège la hiérarchie sans charger une police externe', async () => {
  const contract = await readFile(new URL('../docs/design/wood-typography-contract.md', import.meta.url), 'utf8');
  const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const responsive = await readFile(new URL('../responsive.css', import.meta.url), 'utf8');

  for (const heading of [
    'Source de vérité',
    'Hiérarchie et tokens',
    'Répartition responsive',
    'États et accessibilité',
    'Preuve, décision et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  for (const token of ['--font:Arial,Helvetica,sans-serif', 'font-weight:900', 'line-height:.9', 'letter-spacing:-.075em']) {
    assert.match(stylesheet, new RegExp(token.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')));
  }
  assert.match(stylesheet, /@media\(max-width:500px\)[^{}]*\{?[^}]*\.page-hero h1\{font-size:clamp\(66px,18vw,105px\)/);
  assert.match(responsive, /font-size:\s*clamp\(11px,\s*1\.4vw,\s*17px\)/);
  assert.doesNotMatch(stylesheet, /@import\s+url\(|fonts\.googleapis\.com|fonts\.gstatic\.com/i);
  assert.match(contract, /Arial, Helvetica, sans-serif/);
  assert.match(contract, /prefers-reduced-motion/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
