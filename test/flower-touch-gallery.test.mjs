import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const script = await readFile(new URL('../flower-detail.js', import.meta.url), 'utf8');
const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
const guide = await readFile(new URL('../docs/validation/2026-11-07-flower-touch-gallery.md', import.meta.url), 'utf8');

test('la galerie fleur accepte clic, clavier et balayage tactile', () => {
  assert.match(script, /data-flower-view-toggle/u);
  assert.match(script, /pointerdown/u);
  assert.match(script, /pointerup/u);
  assert.match(script, /Math\.abs\(deltaX\)\s*<\s*42/u);
  assert.match(script, /pointercancel/u);
  assert.match(script, /aria-label/u);
  assert.match(script, /aria-live="polite"/u);
  assert.match(stylesheet, /\.flower-detail__view-toggle[^}]*touch-action:\s*pan-y/u);
  assert.match(stylesheet, /@media\(prefers-reduced-motion:reduce\)[\s\S]*\.flower-detail__view-toggle/u);
});

test('la preuve rappelle le geste, le clavier et le repli animé', () => {
  for (const term of ['balayage', 'clavier', 'reduced-motion', 'iOS/Android', '42 px']) {
    assert.match(guide, new RegExp(term.replace('/', '\\/'), 'iu'));
  }
});
