import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const styles = await readFile(new URL('../wood-why.css', import.meta.url), 'utf8');

test('le module Pourquoi WOOD reste limité à trois preuves éditoriales', () => {
  const section = homepage.match(/<section[^>]+id="pourquoi-wood"[\s\S]*?<\/section>/u)?.[0] || '';
  assert.equal((section.match(/class="wood-why__card"/g) || []).length, 3);
  assert.match(section, /#boutique/);
  assert.match(section, /#univers/);
  assert.match(section, /#histoire/);
  assert.match(section, /data-state="demo"/);
  assert.match(section, /wood-campaign-collage\.webp/);
  assert.match(section, /wood-texture-dome\.webp/);
  assert.match(section, /wood-drop-studio\.webp/);
});

test('le module se replie en cartes lisibles sur mobile et sans motion', () => {
  assert.match(styles, /grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)/u);
  assert.match(styles, /@media \(max-width: 850px\)[\s\S]*grid-template-columns:\s*1fr/u);
  assert.match(styles, /prefers-reduced-motion: reduce/u);
  assert.match(styles, /wood-why__number/iu);
});
