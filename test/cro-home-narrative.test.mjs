import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const audit = await readFile(new URL('../docs/validation/2026-11-07-cro-home-narrative.md', import.meta.url), 'utf8');

test('l’accueil est regroupé en cinq arcs de lecture WOOD', () => {
  for (const heading of ['Signature', 'Univers', 'Choix', 'Vie WOOD', 'Visite et contact']) {
    assert.match(audit, new RegExp(`\\*\\*${heading.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\*\\*`, 'u'));
  }
  const markers = ['id="accueil"', 'id="univers"', 'id="selection-wood"', 'id="humeurs"', 'id="histoire"', 'id="boutique"', 'id="questions"'];
  const positions = markers.map(marker => homepage.indexOf(marker));
  assert.ok(positions.every(position => position >= 0));
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
});

test('le hero associe photo de démonstration, signature WOOD et accès direct', () => {
  assert.match(homepage, /hero-art[\s\S]*wood-campaign-collage\.webp/u);
  assert.match(homepage, /LE CBD<span>AUTRE-/u);
  assert.match(homepage, /Une autre vision du chanvre/u);
  assert.match(homepage, /hero-scroll[\s\S]*href="#univers"/u);
  assert.match(homepage, /SCÈNE HERO · PHOTO DÉMO/u);
  assert.match(homepage, /SI C'EST WOOD, C'EST GOOD\./u);
});

test('les images de l’accueil portent un rôle textuel et un statut honnête', () => {
  const images = [...homepage.matchAll(/<img\b[^>]*>/gu)].map(match => match[0]);
  assert.ok(images.length >= 20);
  assert.ok(images.every(image => /\balt="/u.test(image)), 'chaque image doit avoir un alt');
  assert.match(homepage, /rôle|ambiance|détail|démonstration/iu);
  assert.match(audit, /collage Studio WOOD[\s\S]*ambiance/iu);
  assert.match(audit, /aucune image de démo n’est présentée comme photo authentique/iu);
});

test('la fin d’accueil revient au local sans inscription active', () => {
  assert.match(homepage, /id="boutique"[\s\S]*7 rue Barla[\s\S]*16 avenue Alfred Borriglione/u);
  assert.match(homepage, /id="communaute"[\s\S]*Instagram/u);
  assert.match(homepage, /id="wood-mail-title"/u);
  assert.match(homepage, /id="wood-mail-email"[^>]*disabled/u);
  assert.match(homepage, /id="questions"/u);
  assert.match(homepage, /Questions fréquentes/u);
  assert.match(homepage, /aucun e-mail n['’]est collecté/iu);
});
