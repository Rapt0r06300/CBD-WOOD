import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [homepage, moodScript, editorialCss] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../mood-selector.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-editorial.css', import.meta.url), 'utf8'),
]);

test('l’accueil possède des séquences photo, intention, pack et preuve explicite', () => {
  const markers = [
    'id="univers"',
    'id="humeurs"',
    'id="selection-editoriale"',
    'id="packs"',
    'id="preuve"',
    'id="histoire"',
    'id="boutique"',
    'id="communaute"',
    'id="questions"',
  ];
  const positions = markers.map((marker) => homepage.indexOf(marker));
  assert.ok(positions.every((position) => position >= 0), 'toutes les séquences doivent être présentes');
  assert.deepEqual([...positions].sort((a, b) => a - b), positions, 'les séquences gardent un rythme de lecture stable');
  assert.match(homepage, /id="humeurs"[^>]*data-mood-selector/);
  assert.match(homepage, /id="selection-editoriale"[^>]*data-state="demo"/);
  assert.match(homepage, /id="packs"[^>]*data-offer-state="demo"/);
  assert.match(homepage, /id="preuve"[^>]*data-proof-state="demo"/);
  assert.match(homepage, /class="hero-product-card"/u);
  assert.match(homepage, /class="hero-proof-rail"/u);
  assert.match(homepage, /wood-cloche/gu);
  assert.match(homepage, /data-voucher-state="inactive"/u);
  assert.match(homepage, /mood-selector\.js\?v=wood-mood-v1-20261105/);
});

test('le sélecteur humeur est partageable, clavier-compatible et neutre', () => {
  for (const token of ['data-mood', 'aria-pressed', 'replaceState', 'prefers-reduced-motion', 'detente', 'decouverte']) {
    assert.match(moodScript, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(moodScript, /#mood-/u);
  assert.match(editorialCss, /overflow-x:auto/);
  assert.match(editorialCss, /scroll-snap-type/);
  assert.match(editorialCss, /prefers-reduced-motion/);
  assert.match(editorialCss, /wood-cloche/);
  assert.match(editorialCss, /wood-voucher/);
});

test('les blocs sociaux et commerciaux ne fabriquent pas de preuve ni de promotion', () => {
  assert.match(homepage, /data-proof-reviews/iu);
  assert.match(homepage, /rotation automatique/iu);
  assert.match(homepage, /offre active/iu);
  assert.match(homepage, /PHOTO DÉMO/gu);
  assert.doesNotMatch(homepage, /(?:prix|offre)[^<]{0,120}-\d+%/iu);
});
