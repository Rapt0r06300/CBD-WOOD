import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [report, homepage, script] = await Promise.all([
  readFile(new URL('../docs/validation/2026-11-07-media-budget.md', import.meta.url), 'utf8'),
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../scripts/report-media-budget.mjs', import.meta.url), 'utf8'),
]);

test('le budget média démo garde les références publiques sur leurs WebP', () => {
  for (const asset of ['wood-texture-dome', 'wood-campaign-collage', 'wood-jar-detail', 'wood-drop-studio']) {
    assert.doesNotMatch(homepage, new RegExp(`${asset}\\.png`, 'iu'));
    assert.match(homepage, new RegExp(`${asset}\\.webp`, 'iu'));
  }
  assert.match(report, /PNG possédant un WebP voisin/iu);
  assert.match(report, /appareil réel/iu);
  assert.match(script, /chargement prioritaire/iu);
});
