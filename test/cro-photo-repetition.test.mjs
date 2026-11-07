import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const brief = await readFile(new URL('../docs/design/wood-photo-storyboard.md', import.meta.url), 'utf8');
const repetition = await readFile(new URL('../docs/design/wood-product-repetition-map.md', import.meta.url), 'utf8');
const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('le storyboard photo couvre les familles et les trois besoins de lecture', () => {
  for (const family of ['Fleurs', 'Résines', 'Textile', 'Soins']) assert.match(brief, new RegExp(`\| ${family} \|`, 'u'));
  for (const need of ['hero sous cloche', 'macro', 'vue de taille']) assert.match(brief, new RegExp(need, 'iu'));
  assert.match(brief, /reflets contrôlés/iu);
  assert.match(brief, /photo réelle.*sans cloche|sans cloche.*photo réelle/isu);
});

test('la carte de répétition justifie les reprises par un rôle différent', () => {
  for (const role of ['signature', 'preuve visuelle', 'sélection', 'intention']) assert.match(repetition, new RegExp(role, 'iu'));
  assert.match(repetition, /répétition est autorisée uniquement/iu);
  assert.match(repetition, /Nimbus 3000/iu);
  assert.match(repetition, /Velvet Kush/iu);
  assert.match(homepage, /wood-runway[\s\S]*Euphoria[\s\S]*Purple[\s\S]*Bloody Mary[\s\S]*Orange Bud/iu);
  assert.doesNotMatch(homepage.match(/<section class="wood-runway"[\s\S]*?<\/section>/u)?.[0] ?? '', /Nimbus 3000|Ivory|Pastraweed/iu);
});
