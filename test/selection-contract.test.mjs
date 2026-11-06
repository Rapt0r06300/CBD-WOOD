import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat de sélection accueil relie les cartes démo aux fiches sans simuler une vente', async () => {
  const contract = await readFile(new URL('../docs/design/wood-selection-contract.md', import.meta.url), 'utf8');
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../home-selection.css', import.meta.url), 'utf8');
  const hydration = await readFile(new URL('../catalog-demo-hydration.js', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et sources',
    'Carte et parcours',
    'Données, disponibilité et fallback',
    'Responsive, interaction et accessibilité',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.match(homepage, /id="selection-wood"[^>]*data-state="demo"/);
  assert.equal((homepage.match(/class="wood-selection__card"/g) || []).length, 4);
  assert.equal((homepage.match(/class="wood-selection__visual(?:\s|"|$)/g) || []).length, 4);
  assert.match(homepage, /Illustrations de démonstration|illustrations de démonstration/iu);
  assert.match(homepage, /home-selection\.css\?v=wood-home-selection-v1-20261105/u);
  assert.match(styles, /grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);
  assert.match(styles, /@media\(max-width:500px\)[\s\S]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(styles, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(hydration, /data-demo-only|demoVisual|wood:catalog-rendered/u);
  assert.doesNotMatch(homepage, /selection-wood[\s\S]*?class="add-to-cart"/iu);
  assert.match(contract, /R0162|propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
