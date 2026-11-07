import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const styles = await readFile(new URL('../wood-sticker-wall.css', import.meta.url), 'utf8');
const campaigns = await readFile(new URL('../wood-campaigns.js', import.meta.url), 'utf8');

test('la démo expose un mur de stickers WOOD sans dépendre des décorations', () => {
  assert.match(homepage, /id="sticker-wall"[\s\S]*data-wood-visual-library/u);
  for (const asset of ['wood-sticker-good.svg', 'wood-smiley.svg', 'wood-tag.svg', 'wood-botanical-sticker.svg']) {
    assert.match(homepage, new RegExp(asset.replace('.', '\\.'), 'u'));
  }
  assert.match(homepage, /wood-sticker-tile[\s\S]*aria-hidden="true"/u);
  assert.match(homepage, /sticker-wall[\s\S]*Chill bien cadré/iu);
});

test('les matières numériques WOOD restent décoratives et lisibles', () => {
  for (const material of ['glass', 'wood', 'paper', 'ink']) assert.match(styles, new RegExp(`wood-material--${material}`, 'u'));
  assert.match(styles, /prefers-reduced-motion/iu);
  assert.match(styles, /wood-material.*pointer-events:\s*none/isu);
});

test('la campagne démo est isolable et les mots propriétaire restent en attente', () => {
  assert.match(homepage, /wood-campaign[\s\S]*data-campaign-id="studio-wood"/u);
  assert.match(campaigns, /wood-campaign[\s\S]*off/iu);
  assert.doesNotMatch(campaigns, /fetch|analytics|cookie|localStorage/iu);
  assert.match(homepage, /data-owner-note-state="pending"/u);
  assert.match(homepage, /Mots validés par la propriétaire/iu);
  assert.doesNotMatch(homepage, /Citation de la propriétaire/u);
});
