import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat éditorial garde un rythme WOOD vérifiable sans copier une page concurrente', async () => {
  const contract = await readFile(new URL('../docs/design/wood-editorial-contract.md', import.meta.url), 'utf8');
  const storyboard = await readFile(new URL('../docs/design/wood-home-storyboard.md', import.meta.url), 'utf8');
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const responsive = await readFile(new URL('../responsive.css', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et sources',
    'Séquence éditoriale',
    'Contenu, repli et confiance',
    'Responsive, interaction et accessibilité',
    'Preuve et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  const markers = [
    '<div class="ticker"',
    '<section class="section container" id="univers"',
    '<section class="section container wood-selection" id="selection-wood"',
    '<section id="histoire"',
    '<section class="section visit" id="boutique"',
    '<section class="section container" id="questions"',
    '<footer class="footer">',
  ];
  const positions = markers.map(marker => homepage.indexOf(marker));
  assert.ok(positions.every(position => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
  assert.match(storyboard, /identité → information → découverte/);
  assert.match(storyboard, /ne transforme jamais le `body` en rail horizontal/);
  assert.match(homepage, /<details><summary>/);
  assert.match(homepage, /BARLA/);
  assert.match(homepage, /BORRIGLIONE/);
  assert.match(responsive, /overflow-wrap:\s*anywhere/);
  assert.doesNotMatch(homepage, /best-seller|faux avis|CODEPROMO|retrait en boutique/iu);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
