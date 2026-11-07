import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const responsive = await readFile(new URL('../responsive.css', import.meta.url), 'utf8');
const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const report = await readFile(new URL('../docs/validation/2026-11-07-mobile-first-viewport.md', import.meta.url), 'utf8');

test('le hero compact conserve la promesse WOOD et une action visible', () => {
  assert.match(responsive, /@media\s*\(max-width:\s*360px\)[\s\S]*\.hero h1 span\s*\{[\s\S]*white-space:\s*nowrap/u);
  assert.match(responsive, /@media\s*\(max-width:\s*360px\)[\s\S]*\.hero-copy \.buttons\s*\{[\s\S]*margin-top:\s*24px/u);
  assert.match(homepage, /<h1 id="hero-title">LE CBD<span>AUTRE-<\/span>MENT\.<\/h1>/u);
  assert.match(homepage, /href="#univers" class="btn primary">Découvrir WOOD/u);
  assert.doesNotMatch(responsive, /@media\s*\(max-width:\s*360px\)[\s\S]*overflow-x\s*:\s*hidden/u);
});

test('les cinq captures de largeurs compactes sont conservées', async () => {
  for (const width of [320, 360, 375, 390, 430]) {
    await access(new URL(`../output/playwright/demo-home-local-${width}.png`, import.meta.url));
  }
  for (const term of ['320', '360', '375', '390', '430', 'Découvrir WOOD', 'iOS/Android']) {
    assert.match(report, new RegExp(term.replace('/', '\\/'), 'iu'));
  }
});
