import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const script = await readFile(new URL('../scripts/compare-visual-captures.mjs', import.meta.url), 'utf8');
const manifest = JSON.parse(await readFile(new URL('../docs/validation/2026-11-07-cro-156-visual-regression-manifest.json', import.meta.url), 'utf8'));
const evidence = await readFile(new URL('../docs/validation/2026-11-07-cro-156-visual-regression.md', import.meta.url), 'utf8');
const roadmap = await readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8');

test('la régression visuelle couvre les 24 vues et deux états de viewport', () => {
  assert.equal(manifest.captures.length, 24);
  assert.deepEqual(manifest.viewports, {
    mobile: { width: 390, height: 844 },
    desktop: { width: 1440, height: 900 },
  });
  assert.equal(new Set(manifest.captures.map(capture => capture.route)).size, 12);
  assert.equal(new Set(manifest.captures.map(capture => capture.viewport)).size, 2);
  assert.ok(manifest.captures.every(capture => capture.file.endsWith('.jpg')));
});

test('le comparateur vérifie les captures manquantes et les changements de contenu', () => {
  assert.match(script, /createHash\(['"]sha256['"]\)/u);
  assert.match(script, /missing/u);
  assert.match(script, /changed/u);
  assert.match(script, /args\.reference/u);
  assert.match(script, /args\.current/u);
  assert.match(script, /args\.manifest/u);
  assert.match(evidence, /SHA-256/u);
  assert.match(evidence, /Safe Area/u);
  assert.match(evidence, /aucun écart/u);
  assert.match(roadmap, /\[x\] \*\*CRO-156/u);
});
