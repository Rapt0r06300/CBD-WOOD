import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const homepage = await readFile(new URL('index.html', root), 'utf8');
const motion = await readFile(new URL('wood-motion.js', root), 'utf8');
const contract = await readFile(new URL('docs/validation/2026-11-07-txw-008-symbol-check.md', root), 'utf8');
const image = await readFile(new URL('assets/editorial/wood-drop-studio.webp', root));

test('TXW-008 protège la scène Studio WOOD contre le glyphe de remplacement du navigateur', () => {
  assert.ok(image.length > 1000);
  assert.match(homepage, /data-campaign-image/iu);
  assert.match(homepage, /wood-campaign__fallback/iu);
  assert.match(homepage, /SCÈNE STUDIO · REPLI LOCAL/iu);
  assert.match(motion, /initCampaignFallback/iu);
  assert.match(motion, /naturalWidth === 0/iu);
});

test('TXW-008 conserve la vérification iPhone comme porte externe', () => {
  for (const term of ['symbole « ? »', 'Safari iOS', 'glyphe', 'SVG', 'décodage', 'cache', 'BLOCKED-EXTERNAL']) {
    assert.match(contract, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(contract, /ne sera pas comptée/iu);
});
