import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat du hero WOOD protège le premier écran sans promesse commerciale inventée', async () => {
  const contract = await readFile(new URL('../docs/design/wood-hero-contract.md', import.meta.url), 'utf8');
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const responsive = await readFile(new URL('../responsive.css', import.meta.url), 'utf8');
  const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source de vérité',
    'Composition et parcours',
    'Données, états et fallback',
    'Responsive, accessibilité et motion',
    'Preuve et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.match(homepage, /<section class="hero"/);
  assert.match(homepage, /<h1 id="hero-title">/);
  assert.match(homepage, /class="hero-scroll" href="#univers"/);
  assert.match(homepage, /data-demo-only/);
  assert.match(homepage, /id="woodOfferPreview"[^>]*hidden/);
  assert.match(homepage, /id="woodActivityPreview"[^>]*hidden/);
  for (const asset of ['assets/fleurs.svg', 'assets/resines.svg', 'assets/accessoires.svg', 'assets/cosmetiques.svg']) {
    assert.match(homepage, new RegExp(`<img loading="eager" src="${asset.replace('.', '\\.')}`));
  }
  assert.match(stylesheet, /@media\(prefers-reduced-motion:reduce\)/);
  assert.doesNotMatch(homepage, /CODEPROMO|PROMO-[A-Z0-9]+|vient d['’]acheter/iu);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /Safari|Firefox|appareils/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
