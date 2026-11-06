import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [shell, css, homepage] = await Promise.all([
  readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-editorial.css', import.meta.url), 'utf8'),
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
]);

test('les nouvelles séquences éditoriales rejoignent le reveal existant sans bloquer le scroll', () => {
  for (const selector of ['.wood-mood', '#selection-editoriale', '.wood-pack', '#preuve', '.wood-community', '.wood-photo-rail']) {
    assert.match(shell, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'u'));
  }
  assert.match(shell, /IntersectionObserver/u);
  assert.doesNotMatch(shell, /(?:wheel|touchmove|scroll)[\s\S]{0,240}preventDefault\(\)/u);
  assert.match(css, /scroll-snap-type/);
  assert.match(css, /\.wood-reveal\{[^}]*opacity:0/);
  assert.match(css, /html\.wood-low-data \.wood-reveal/);
  assert.match(homepage, /prefers-reduced-motion/);
});
