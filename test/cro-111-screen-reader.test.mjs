import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const protocol = await readFile(new URL('docs/validation/2026-11-07-cro-111-screen-reader.md', root), 'utf8');
const pages = {
  home: await readFile(new URL('index.html', root), 'utf8'),
  flower: await readFile(new URL('fleur.html', root), 'utf8'),
  contact: await readFile(new URL('contact.html', root), 'utf8'),
  checkout: await readFile(new URL('checkout.html', root), 'utf8')
};

test('CRO-111 documente le parcours lecteur d’écran sans validation physique inventée', () => {
  for (const term of ['liste', 'fiche', 'menu', 'contact', 'panier fictif', 'VoiceOver', 'NVDA', 'BLOCKED-EXTERNAL']) {
    assert.match(protocol, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(protocol, /Aucune action uniquement visuelle/iu);
  assert.match(protocol, /validation réelle/iu);
});

test('CRO-111 conserve des repères sémantiques pour les zones parcourues', () => {
  assert.match(pages.home, /<main\b[^>]*>/iu);
  assert.match(pages.home, /aria-label="Navigation principale"/u);
  assert.match(pages.home, /aria-live="polite"/u);
  assert.match(pages.flower, /<main\b[^>]*>/iu);
  assert.match(pages.contact, /<main\b[^>]*>/iu);
  assert.match(pages.checkout, /<main\b[^>]*>/iu);
});
