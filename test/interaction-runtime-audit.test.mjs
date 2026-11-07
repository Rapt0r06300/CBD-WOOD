import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [actions, motion, evidence] = await Promise.all([
  readFile(new URL('../wood-product-actions.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-motion.js', import.meta.url), 'utf8'),
  readFile(new URL('../docs/validation/2026-11-07-interaction-runtime.md', import.meta.url), 'utf8'),
]);

test('les interactions de démo restent idempotentes après un rendu catalogue', () => {
  assert.match(actions, /if \(meta\) meta\.prepend\(preview\);/u);
  assert.doesNotMatch(actions, /insertBefore\(preview, meta \|\| null\)/u);
  assert.match(actions, /document\.addEventListener\('wood:catalog-rendered', wireAll\)/u);
  assert.match(motion, /dataset\.motionWired === 'true'/u);
  assert.match(motion, /dataset\.woodPointerWired === 'true'/u);
  assert.match(evidence, /12\/12 routes, 0 erreur, 0 warning/iu);
});
