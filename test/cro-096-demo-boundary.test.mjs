import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [prepare, verifier, demoMode, pagesGuide] = await Promise.all([
  readFile(new URL('../scripts/prepare-github-pages.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/verify-github-pages-package.mjs', import.meta.url), 'utf8'),
  readFile(new URL('../demo-mode.js', import.meta.url), 'utf8'),
  readFile(new URL('../docs/ops/github-pages-deploy.md', import.meta.url), 'utf8'),
]);

test('la frontière base/démo est explicite et vérifiable', () => {
  assert.match(prepare, /const baseRoot = join\(output, 'base'\)/u);
  assert.match(prepare, /const demoRoot = join\(output, 'demo'\)/u);
  assert.match(prepare, /injectDemoMode\(injectSwitcher/u);
  assert.match(prepare, /gitFile\(file\)/u);
  assert.match(prepare, /for \(const file of \['404\.html'\]\)/u);
  assert.match(prepare, /root-relative href would escape/u);
  assert.match(verifier, /demo-mode\\\.js\|wood-d1-adapter\\\.js/u);
  assert.match(verifier, /baseHome === demoHome|base.*demo.*identiques/isu);
  assert.match(demoMode, /Aucune commande ne sera créée/u);
  assert.match(demoMode, /stopImmediatePropagation/u);
  assert.match(pagesGuide, /racine.*base|\/demo/isu);
});
