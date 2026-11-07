import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const finishCss = await readFile(new URL('../wood-mobile-finish.css', import.meta.url), 'utf8');

test('le hero mobile réserve la zone de la navigation basse autour des CTA', () => {
  assert.match(
    finishCss,
    /@media\s*\(max-width:\s*800px\)[\s\S]*?\.hero-copy\s+\.buttons\s*\{[\s\S]*?display:\s*grid[\s\S]*?grid-template-columns:\s*repeat\(2/u,
  );
  assert.match(finishCss, /\.hero-copy\s+\.buttons\s+\.btn\s*\{[\s\S]*?width:\s*100%/u);
  assert.match(finishCss, /\.hero-copy\s+\.buttons\s*\{[\s\S]*?position:\s*relative[\s\S]*?top:\s*-4px/u);
  assert.match(finishCss, /@media\s*\(max-width:\s*340px\)[\s\S]*?\.hero-copy\s+\.buttons\s*\{[\s\S]*?margin-top:\s*24px/u);
});
