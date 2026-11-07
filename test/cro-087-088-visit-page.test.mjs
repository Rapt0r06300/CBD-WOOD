import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (file) => readFile(new URL(file, root), 'utf8');
const [page, style, home, product, roadmap] = await Promise.all([
  read('rendez-vous.html'),
  read('wood-visit.css'),
  read('index.html'),
  read('fleur.html'),
  read('docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md'),
]);

test('CRO-087 fournit une page rendez-vous WOOD autonome et honnête', () => {
  assert.match(page, /<title>[^<]*Rendez-vous[^<]*WOOD/iu);
  assert.match(page, /id="visit-title"/u);
  assert.match(page, /7 rue Barla/iu);
  assert.match(page, /16 avenue Alfred Borriglione/iu);
  assert.match(page, /tel:\+33422163570/u);
  assert.match(page, /tel:\+33423130305/u);
  assert.match(page, /google\.com\/maps\/dir/iu);
  assert.match(page, /Horaires habituels[^<]*à confirmer/iu);
  assert.match(page, /PHOTO BOUTIQUE À REMPLACER/iu);
  assert.match(page, /data-state="demo"/u);
  assert.match(page, /wood-visit\.css/iu);
  assert.doesNotMatch(page, /maps\.googleapis\.com|geolocation|getCurrentPosition/iu);
  assert.match(style, /prefers-reduced-motion/iu);
  assert.match(style, /@media\s*\(max-width:\s*\d+px\)/iu);
});

test('CRO-088 relie l’accueil et une fiche aux deux boutiques', () => {
  assert.match(home, /href="rendez-vous\.html"/u);
  assert.match(product, /href="rendez-vous\.html\?source=fiche"/u);
  assert.match(page, /href="tel:\+33422163570"/u);
  assert.match(page, /href="tel:\+33423130305"/u);
  assert.match(page, /href="https:\/\/www\.google\.com\/maps\/dir/iu);
  assert.match(roadmap, /^- \[x\] \*\*CRO-087 —/mu);
  assert.match(roadmap, /^- \[x\] \*\*CRO-088 —/mu);
});
