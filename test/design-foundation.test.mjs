import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const [direction, storyboard, photo, motion, boutique, responsive] = await Promise.all([
  read('docs/design/wood-direction-register.md'),
  read('docs/design/wood-home-storyboard.md'),
  read('docs/design/wood-photo-brief.md'),
  read('docs/design/wood-loading-grammar.md'),
  read('boutique.css'),
  read('responsive.css'),
]);

test('la fondation artistique conserve une grille, une hiérarchie et trois densités WOOD', () => {
  for (const phrase of ['1440px', 'calme', 'sélection', 'impact', 'kicker → titre → phrase courte → action', 'surface sombre']) {
    assert.match(direction, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(boutique, /\.container\{max-width:1440px/);
  assert.match(boutique, /\.product-grid\{[^}]*repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(responsive, /grid-template-columns:\s*1fr/);
});

test('le storyboard desktop/mobile reprend la richesse de présentation sans changer WOOD', () => {
  assert.match(storyboard, /Desktop — composition large/);
  assert.match(storyboard, /Mobile — composition app-like/);
  for (const universe of ['fleurs', 'résines', 'bien-être\/huiles', 'textile\/goods']) {
    assert.match(storyboard, new RegExp(universe));
  }
  assert.match(storyboard, /partagent les mêmes informations/);
});

test('le brief photo décrit les vrais visuels sans bocal ni cloche et leurs ratios', () => {
  assert.match(photo, /sans bocal, cloche, sachet ou accessoire/);
  for (const ratio of ['1:1', '4:5', '3:2', 'WebP']) assert.match(photo, new RegExp(ratio.replace(':', '\\:')));
  for (const field of ['source', 'autorisation', 'dimensions', 'poids', 'texte alternatif', 'demo', 'approved']) {
    assert.match(photo, new RegExp(field));
  }
});

test('les accents décoratifs restent optionnels et les interactions restent accessibles', () => {
  assert.match(direction, /Un sticker, un emoji ou une image décorative ne porte jamais seul/i);
  assert.match(direction, /masqué, non chargé ou\s+retiré/i);
  assert.match(motion, /prefers-reduced-motion/);
  assert.match(motion, /ne bloque le défilement/);
});

test('le tempo de mouvement est borné et ne change pas la géométrie commerciale', () => {
  assert.match(motion, /deux pulsations de 0,8 seconde/);
  assert.match(boutique, /transform \.2s/);
  assert.match(boutique, /transform \.45s/);
  assert.match(boutique, /prefers-reduced-motion:reduce/);
});
