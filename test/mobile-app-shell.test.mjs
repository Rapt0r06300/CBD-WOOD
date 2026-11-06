import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const publicPages = [
  'index.html',
  'wood-shop.html',
  'fleurs.html',
  'fleur.html',
  'produit.html',
  'resines.html',
  'bien-etre.html',
  'compte.html',
  'checkout.html',
  'confirmation.html',
];

test('toutes les pages publiques chargent la couche app-like mobile', async () => {
  for (const page of publicPages) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');
    assert.match(html, /mobile\.css\?v=wood-mobile-app-v6-20261104/, `${page} doit charger mobile.css`);
    assert.match(html, /mobile-shell\.js\?v=wood-mobile-app-v5-20261105/, `${page} doit charger mobile-shell.js`);
    assert.match(html, /name="viewport" content="width=device-width, initial-scale=1"/, `${page} doit conserver le viewport responsive`);
  }
});

test('la couche mobile utilise les capacités réelles du navigateur et protège les zones sûres', async () => {
  const stylesheet = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  const boutiqueStylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');

  assert.match(stylesheet, /@media \(max-width: 800px\)/);
  assert.match(stylesheet, /@media \(hover: none\)/);
  assert.match(stylesheet, /env\(safe-area-inset-top/);
  assert.match(stylesheet, /env\(safe-area-inset-bottom/);
  assert.match(stylesheet, /min-height: 48px/);
  assert.match(stylesheet, /100svh/);
  assert.match(stylesheet, /@media \(any-pointer: coarse\)/);
  assert.doesNotMatch(shell, /navigator\.userAgent|platform\.toLowerCase/);
  assert.match(shell, /mobile-app-nav/);
  assert.match(shell, /cartTrigger\.click\(\)/);
  assert.match(shell, /'produit\.html'/);
  assert.match(shell, /IntersectionObserver/);
  assert.match(shell, /prefers-reduced-motion/);
  assert.match(shell, /initPageTransitions/);
  assert.match(shell, /wood-page-exit/);
  assert.match(shell, /window\.location\.assign/);
  assert.match(shell, /initFooterSections/);
  assert.match(shell, /woodFooterSections/);
  assert.match(shell, /WOOD_ICON_MARKUP/);
  for (const iconName of ['home', 'catalog', 'pin', 'cart', 'account', 'store', 'phone', 'directions', 'delivery', 'faq']) {
    assert.match(shell, new RegExp(`${iconName}:`), `le pictogramme ${iconName} doit être défini`);
  }
  assert.match(shell, /createElementNS\('http:\/\/www\.w3\.org\/2000\/svg'/);
  assert.match(shell, /aria-hidden', 'true'/);
  assert.match(shell, /hydrateWoodIcons/);
  assert.match(stylesheet, /\.wood-icon--inline/);
  assert.match(stylesheet, /\.mobile-app-nav__icon \.wood-icon/);
  assert.match(stylesheet, /\.wood-reveal\.is-visible/);
  assert.match(boutiqueStylesheet, /\.footer-section>summary/);
  assert.match(boutiqueStylesheet, /wood-page-transitions body\.wood-page-ready/);
  assert.match(boutiqueStylesheet, /wood-page-transitions body\.wood-page-exit/);
});

test('la navigation mobile ne se charge pas dans l’espace propriétaire', async () => {
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  const account = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
  assert.match(shell, /classList\.contains\('admin-page'\)/);
  assert.match(account, /ownerDashboard/);
});

test('le shell public prévoit un fallback pour les visuels de l’accueil', async () => {
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  const stylesheet = await readFile(new URL('../responsive.css', import.meta.url), 'utf8');
  assert.match(shell, /wireLandingImageFallback/);
  assert.match(shell, /landingFallbackApplied/);
  assert.match(stylesheet, /\.wood-image-fallback::after/);
  assert.match(stylesheet, /VISUEL À VENIR/);
});

test('les cartes WOOD Shop gardent leur action dans la colonne mobile', async () => {
  const stylesheet = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  const shell = await readFile(new URL('../mobile-shell.js', import.meta.url), 'utf8');
  const shop = await readFile(new URL('../wood-shop.html', import.meta.url), 'utf8');

  assert.match(shop, /class="product-meta"[\s\S]*class="add-to-cart"/);
  assert.match(stylesheet, /\.product-grid\s+\.product-meta\s*\{\s*display:\s*grid/);
  assert.match(stylesheet, /\.product-grid\s+\.product-meta\s+\.add-to-cart\s*\{[\s\S]*?width:\s*100%/);
  assert.match(stylesheet, /\.product-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2/);
  assert.match(shell, /href: 'index\.html#univers'/);
});

test('le libellé Nous trouver reste entier dans la barre mobile étroite', async () => {
  const stylesheet = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  assert.match(stylesheet, /@media \(max-width: 430px\)[\s\S]*?\.mobile-app-nav__label\s*\{[\s\S]*?text-overflow:\s*clip/);
  assert.match(stylesheet, /@media \(max-width: 430px\)[\s\S]*?\.mobile-app-nav__label\s*\{[\s\S]*?font-size:\s*clamp/);
});
