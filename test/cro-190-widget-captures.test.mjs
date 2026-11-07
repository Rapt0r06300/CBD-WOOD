import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [manifest, roadmap, evidence] = await Promise.all([
  readFile(new URL('../docs/validation/2026-11-07-cro-190-widget-capture-manifest.json', import.meta.url), 'utf8').then(JSON.parse),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/validation/2026-11-07-cro-190-widget-captures.md', import.meta.url), 'utf8'),
]);

test('CRO-190 couvre les états conseiller desktop, fiche et mobile', () => {
  assert.equal(manifest.entries.length, 4);
  assert.deepEqual(manifest.entries.map((entry) => entry.state), ['minified', 'open', 'product-scroll-open', 'product-scroll-open']);
  assert.ok(manifest.entries.some((entry) => entry.viewport === '390x844'));
  assert.ok(manifest.entries.every((entry) => entry.file.endsWith('.png')));
});

test('CRO-190 relie les captures à une recette locale sans validation propriétaire présumée', () => {
  assert.match(roadmap, /\[x\] \*\*CRO-190/u);
  for (const term of ['Playwright', '1440×900', '390×844', 'validation propriétaire']) assert.match(evidence, new RegExp(term, 'u'));
});
