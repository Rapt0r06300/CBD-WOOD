import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('la page d’accueil garde le shell éditorial WOOD complet et dans le bon ordre', () => {
  const markers = [
    '<div class="announcement">',
    '<header class="nav">',
    '<section class="hero"',
    '<div class="ticker"',
    '<section class="section container" id="univers"',
    '<section id="histoire"',
    '<section class="section visit" id="boutique"',
    '<section class="section container" id="questions"',
    '<footer class="footer">',
  ];
  const positions = markers.map((marker) => homepage.indexOf(marker));
  assert.ok(positions.every((position) => position >= 0), 'le shell WOOD doit contenir toutes ses sections');
  assert.deepEqual([...positions].sort((a, b) => a - b), positions, 'les sections doivent rester dans l’ordre éditorial');

  assert.match(homepage, /<h1 id="hero-title">LE CBD<span>AUTRE-<\/span>MENT\.<\/h1>/);
  assert.match(homepage, /Découvrir WOOD/);
  assert.match(homepage, /Nous trouver/);
  assert.match(homepage, /class="hero-scroll" href="#univers"/);
  assert.match(homepage, /aria-label="Descendre vers les univers WOOD"/);
  assert.match(homepage, /class="cards"/);
  assert.equal((homepage.match(/aria-label="Voir la page /g) || []).length, 4);
  for (const route of ['fleurs.html', 'resines.html', 'wood-shop.html', 'bien-etre.html']) {
    assert.match(homepage, new RegExp(`href="${route}"`), `l’univers ${route} doit être accessible depuis l’accueil`);
  }

  for (const primitive of ['class="eyebrow"', 'class="kicker"', 'class="big-title"', 'class="section-aside"', 'class="story"', 'class="value-grid"', 'class="faq-layout"']) {
    assert.match(homepage, new RegExp(primitive.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(homepage, /<h3>BARLA<\/h3>/);
  assert.match(homepage, /<h3>BORRIGLIONE<\/h3>/);
  assert.match(homepage, /<details><summary>/);
  assert.match(homepage, /class="footer-links"/);
  assert.doesNotMatch(homepage, /href="admin\.html"/i);
});

test('le repère de défilement reste un lien simple et non bloquant', async () => {
  const responsive = await readFile(new URL('../responsive.css', import.meta.url), 'utf8');
  assert.match(homepage, /hero-scroll[^>]*href="#univers"/);
  assert.match(homepage, /@media\(prefers-reduced-motion:reduce\)/);
  assert.doesNotMatch(responsive, /hero-scroll[^\n]*position:\s*fixed/);
});

test('les contenus longs de l’accueil ont un repli mobile', async () => {
  const responsive = await readFile(new URL('../responsive.css', import.meta.url), 'utf8');
  assert.match(responsive, /\.faq-items summary/);
  assert.match(responsive, /\.footer-links a/);
  assert.match(responsive, /overflow-wrap:\s*anywhere/);
});
