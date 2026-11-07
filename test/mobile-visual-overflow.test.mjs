import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const motion = await readFile(new URL('../wood-mobile-finish.css', import.meta.url), 'utf8');
const graffiti = await readFile(new URL('../wood-graffiti.css', import.meta.url), 'utf8');

test('les animations et graffitis mobiles restent dans le flux horizontal', () => {
  assert.match(motion, /@media\s*\(max-width:\s*800px\)[\s\S]*?\.wood-reveal-v2\[data-reveal-from="left"\]\s*,\s*\.wood-reveal-v2\[data-reveal-from="right"\][\s\S]*?transform:\s*translate3d\(0,\s*26px,\s*0\)/u);
  assert.match(graffiti, /@media\s*\(max-width:800px\)[\s\S]*?\.story-text\s+\.wood-graffiti--story-sticker\{[^}]*right:0/u);
  assert.match(graffiti, /@media\s*\(max-width:800px\)[\s\S]*?\.visit\s+\.wood-graffiti--visit-scribble\{[^}]*right:0/u);
  assert.match(graffiti, /@media\s*\(max-width:800px\)[\s\S]*?\.wood-selection__card\s+\.wood-graffiti--botanical\{[^}]*right:0/u);
});
