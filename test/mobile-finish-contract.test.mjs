import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [homepage, finishCss, finishJs] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../wood-mobile-finish.css', import.meta.url), 'utf8'),
  readFile(new URL('../wood-mobile-finish.js', import.meta.url), 'utf8'),
]);

test('la finition mobile est chargée après le motion existant', () => {
  assert.match(homepage, /wood-mobile-finish\.css\?v=wood-mobile-finish-v1/);
  assert.match(homepage, /wood-mobile-finish\.js\?v=wood-mobile-finish-v1/);
  assert.ok(homepage.indexOf('wood-mobile-finish.css') > homepage.indexOf('wood-motion.css'));
  assert.ok(homepage.indexOf('wood-mobile-finish.js') > homepage.indexOf('wood-motion.js'));
});

test('la couche mobile compacte les séquences et protège la zone basse', () => {
  assert.match(finishCss, /body\.has-mobile-app-nav[\s\S]*padding-bottom/);
  assert.match(finishCss, /scroll-margin-bottom:[^;]*var\(--wood-mobile-bar-height/);
  assert.match(finishCss, /\.wood-drop-grid,[\s\S]*?\.wood-runway__grid,[\s\S]*?\.wood-pack__grid,[\s\S]*?\{[\s\S]*?display:\s*flex/);
  assert.match(finishCss, /\.wood-pack__grid[\s\S]*?display:\s*flex/);
  assert.match(finishCss, /\.wood-mobile-rail-cue/);
  assert.match(finishCss, /min-width:\s*44px/);
  assert.match(finishCss, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

test('le module mobile fournit un rail tactile et une barre directionnelle', () => {
  assert.match(finishJs, /wood-mobile-rail-cue/);
  assert.match(finishJs, /scrollLeft/);
  assert.match(finishJs, /wood-nav-hidden/);
  assert.match(finishJs, /prefers-reduced-motion/);
  assert.match(finishJs, /saveData|effectiveType/);
  assert.match(finishJs, /passive:\s*true/);
  assert.match(finishJs, /if \(!nav \|\| reduced\) return/);
});

test('la preuve Google reste automatique sans contrôle visible', () => {
  assert.doesNotMatch(homepage, /data-proof-review-(?:prev|next|count)/);
  assert.match(homepage, /data-proof-reviews/);
  assert.match(homepage, /rotation automatique/iu);
});
