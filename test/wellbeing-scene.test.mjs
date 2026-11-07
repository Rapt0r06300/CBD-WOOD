import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const page = await readFile(new URL('../bien-etre.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');

test('la page bien-être possède une scène éditoriale de démonstration', () => {
  assert.match(page, /class="wood-care-scene\b[\s\S]*data-state="demo"/u);
  assert.match(page, /id="care-scene-title"/u);
  assert.match(page, /étagères|plantes|matière/iu);
  assert.match(page, /SCÈNE DÉMO/iu);
  assert.match(page, /sans promesse médicale|aucune promesse médicale/iu);
});

test('la scène bien-être garde une composition mobile et un repli sans mouvement', () => {
  for (const selector of ['.wood-care-scene', '.wood-care-scene__media', '.wood-care-scene__copy']) {
    assert.match(css, new RegExp(selector.replace('.', '\\.'), 'u'));
  }
  assert.match(css, /@media[^{}]*max-width\s*:\s*760px[\s\S]*?wood-care-scene/iu);
  assert.match(css, /prefers-reduced-motion[\s\S]*?wood-care-scene/iu);
});
