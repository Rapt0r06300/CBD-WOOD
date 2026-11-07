import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const graffiti = await readFile(new URL('../wood-graffiti.css', import.meta.url), 'utf8');
const motion = await readFile(new URL('../wood-motion.css', import.meta.url), 'utf8');
const mobile = await readFile(new URL('../wood-mobile-finish.css', import.meta.url), 'utf8');
const evidence = await readFile(new URL('../docs/validation/2026-11-07-css-rationalisation.md', import.meta.url), 'utf8');

test('les feuilles WOOD suivent un ordre de couches explicite', () => {
  const order = [
    'responsive.css',
    'mobile.css',
    'wood-graffiti.css',
    'wood-editorial.css',
    'wood-motion.css',
    'wood-mobile-finish.css',
  ];
  let previous = -1;
  for (const stylesheet of order) {
    const current = index.indexOf(`href="${stylesheet}`);
    assert.notEqual(current, -1, `${stylesheet} doit être chargé`);
    assert.ok(current > previous, `${stylesheet} doit respecter l'ordre des couches`);
    previous = current;
  }
  assert.match(evidence, /ordre canonique/u);
});

test('les couches décoratives n’embarquent pas d’attribut HTML invalide', () => {
  assert.doesNotMatch(graffiti, /aria-hidden\s*:/u);
  assert.equal((graffiti.match(/^\.wood-graffiti\{/gmu) || []).length, 1);
  assert.match(motion, /prefers-reduced-motion/u);
  assert.match(mobile, /@media \(max-width: 800px\)/u);
  assert.match(evidence, /repli/u);
});
