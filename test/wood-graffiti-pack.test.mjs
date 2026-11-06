import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const assetNames = [
  'wood-arrow.svg',
  'wood-star.svg',
  'wood-halo.svg',
  'wood-tag.svg',
  'wood-speed-line.svg',
  'wood-botanical-sticker.svg',
  'wood-section-stamp.svg',
  'wood-card-accent.svg',
  'wood-burst.svg',
  'wood-scribble.svg',
  'wood-zigzag.svg',
  'wood-smiley.svg',
  'wood-crown.svg',
  'wood-splash.svg',
  'wood-loop-arrow.svg',
  'wood-sticker-good.svg',
];

const [homepage, graffitiCss] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../wood-graffiti.css', import.meta.url), 'utf8'),
]);

test('le pack graffiti WOOD contient seize SVG décoratifs vérifiables', async () => {
  const contract = await readFile(new URL('../docs/design/wood-graffiti-pack.md', import.meta.url), 'utf8');
  for (const heading of ['Flèche', 'Étoile', 'Halo', 'Tag', 'Ligne de vitesse', 'Sticker botanique', 'Tampon de section', 'Accent de carte', 'Burst', 'Scribble', 'Zigzag', 'Smiley', 'Couronne', 'Splash', 'Flèche en boucle', 'Sticker GOOD MOOD']) {
    assert.match(contract, new RegExp(heading, 'iu'));
  }
  for (const assetName of assetNames) {
    const assetPath = new URL(`../assets/graffiti/${assetName}`, import.meta.url);
    await access(assetPath);
    const svg = await readFile(assetPath, 'utf8');
    assert.match(svg, /^<svg\b/iu);
    assert.match(svg, /aria-hidden="true"/iu);
    assert.match(svg, /focusable="false"/iu);
  }
});

test('le contrat graffiti interdit la dépendance au décor', async () => {
  const contract = await readFile(new URL('../docs/design/wood-graffiti-pack.md', import.meta.url), 'utf8');
  for (const phrase of ['décoratif', 'ne porte jamais', 'masqué', 'prefers-reduced-motion', 'ne copie pas']) {
    assert.match(contract, new RegExp(phrase, 'iu'));
  }
});

test('les graffitis sont intégrés par zone sans entrer dans le parcours commercial', () => {
  assert.match(homepage, /wood-graffiti\.css\?v=wood-graffiti-v2-20261105/);
  for (const assetName of assetNames) {
    assert.match(homepage, new RegExp(`assets/graffiti/${assetName.replace('.', '\\.')}`));
  }
  assert.equal((homepage.match(/class="wood-graffiti/g) || []).length, 26);
  assert.equal((homepage.match(/class="wood-graffiti[^>]*aria-hidden="true"/g) || []).length, 26);
  assert.match(graffitiCss, /pointer-events:none/);
  assert.match(graffitiCss, /\.wood-selection \.wood-graffiti--botanical\{[^}]*width:/u);
  assert.match(graffitiCss, /@media\s+print/);
  assert.match(graffitiCss, /prefers-reduced-motion/);
});
