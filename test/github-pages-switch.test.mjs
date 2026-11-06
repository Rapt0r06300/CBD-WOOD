import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const switchScript = await readFile(new URL('../github-pages-switch.js', import.meta.url), 'utf8');
const switchStyles = await readFile(new URL('../github-pages-switch.css', import.meta.url), 'utf8');
const prepareScript = await readFile(new URL('../scripts/prepare-github-pages.mjs', import.meta.url), 'utf8');

test('le switch GitHub Pages relie toujours les versions démo et base', () => {
  assert.match(switchScript, /\.github\\\.io/u);
  assert.match(switchScript, /DÉMO/u);
  assert.match(switchScript, /BASE/u);
  assert.match(switchScript, /aria-current/u);
  assert.match(switchStyles, /github-pages-switch/u);
  assert.match(prepareScript, /demoRoot/u);
  assert.match(prepareScript, /baseRoot/u);
  assert.match(prepareScript, /origin\/main/u);
  assert.match(prepareScript, /injectSwitcher/u);
});
