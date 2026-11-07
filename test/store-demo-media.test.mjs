import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { getOwnerMediaPreview } from '../owner-media.mjs';

const flowerSlugs = [
  'nimbus-3000', 'ivory', 'velvet-kush', 'pastraweed', 'euphoria', 'purple',
  'bloody-mary', 'cosmic-cbg', 'charlotte', 'rainbow', 'orange-bud', 'plutonium', 'fanta-hazy',
];

test('la boutique fleurs utilise les mêmes illustrations que l’espace propriétaire', async () => {
  const html = await readFile(new URL('../fleurs.html', import.meta.url), 'utf8');
  const presentationScript = await readFile(new URL('../flower-presentation.js', import.meta.url), 'utf8');
  const hydrationScript = await readFile(new URL('../catalog-demo-hydration.js', import.meta.url), 'utf8');
  const sources = [...presentationScript.matchAll(/image:\s*'([^']+)'/gu)].map(match => match[1]);

  assert.equal(sources.length, flowerSlugs.length);
  assert.equal(new Set(sources).size, flowerSlugs.length);
  assert.match(html, /<script src="catalog-demo-hydration\.js"><\/script>/u);
  for (const slug of flowerSlugs) {
    assert.ok(sources.includes(`assets/flowers/fleurs-${slug}.webp`));
    assert.deepEqual(getOwnerMediaPreview({ category: 'fleurs', slug, name: slug }), {
      src: `assets/flowers/fleurs-${slug}.webp`,
      alt: `Illustration de démonstration de ${slug}`,
      isDemo: true,
    });
  }
  assert.match(presentationScript, /demoDescription/gu);
  assert.match(hydrationScript, /mouseenter/u);
  assert.match(hydrationScript, /assets\/fleurs\.svg/u);
  assert.match(hydrationScript, /entry\.image/u);
});

test('les changements d’image restent utilisables au clavier et au toucher', async () => {
  const hydrationScript = await readFile(new URL('../catalog-demo-hydration.js', import.meta.url), 'utf8');
  const engagementScript = await readFile(new URL('../wood-engagement.js', import.meta.url), 'utf8');

  assert.match(hydrationScript, /focusin/u);
  assert.match(hydrationScript, /pointerdown/u);
  assert.match(hydrationScript, /pointerup/u);
  assert.match(engagementScript, /focusin/u);
  assert.match(engagementScript, /pointerdown/u);
  assert.match(engagementScript, /pointerup/u);
});

test('les cartes recréées après le chargement Supabase récupèrent les mêmes interactions', async () => {
  const hydrationScript = await readFile(new URL('../catalog-demo-hydration.js', import.meta.url), 'utf8');

  assert.match(hydrationScript, /wood:catalog-rendered/u);
  assert.match(hydrationScript, /demoVisual/u);
  assert.match(hydrationScript, /hydrateCatalog/u);
});

test('l’accueil montre une sélection WOOD cohérente avec la boutique', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const sources = [...html.matchAll(/class="wood-selection__visual(?:\s[^"]*)?"[\s\S]*?<img src="([^"]+)"/gu)].map(match => match[1]);

  assert.deepEqual(sources, [
    'assets/editorial/wood-jar-detail.webp',
    'assets/editorial/wood-texture-dome.webp',
    'assets/flowers/fleurs-velvet-kush.webp',
    'assets/editorial/wood-jar-detail.webp',
  ]);
  assert.match(html, /illustrations de démonstration/iu);
  assert.match(html, /home-selection\.css\?v=wood-home-selection-v1-20261105/u);
});
