import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('checkout section keeps the shared container gutters', async () => {
  const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const ownerStylesheet = await readFile(new URL('../owner-dashboard.css', import.meta.url), 'utf8');
  for (const page of ['bien-etre.html', 'compte.html', 'confirmation.html', 'fleur.html', 'fleurs.html', 'resines.html', 'wood-shop.html', 'checkout.html']) {
    const html = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');
    assert.match(
      html,
      /boutique\.css\?v=wood-responsive-v7-20261105/,
      `${page} doit charger la feuille responsive publiée sans cache obsolète`,
    );
  }

  assert.match(
    stylesheet,
    /\.checkout-section\{padding-top:78px;padding-bottom:100px\}/,
    'la section checkout ne doit pas réinitialiser les marges horizontales du conteneur',
  );

  assert.match(
    stylesheet,
    /html\{scroll-behavior:smooth;scroll-padding-top:86px;-webkit-text-size-adjust:100%;text-size-adjust:100%\}/,
    'la taille du texte doit rester cohérente sur Safari mobile',
  );

  assert.match(
    stylesheet,
    /\.checkout-section h1\{font-size:clamp\(34px,calc\(17\.15vw - 20\.86px\),46px\)\}/,
    'le titre checkout doit rester lisible sur les téléphones étroits',
  );

  assert.match(
    stylesheet,
    /@media \(min-width:801px\) and \(max-width:900px\)\{\.nav\{height:68px\}/,
    'la navigation boutique doit passer en mode compact avant de déborder sur tablette',
  );
  assert.match(
    homepage,
    /@media \(min-width:801px\) and \(max-width:900px\)\{\.nav\{height:68px\}/,
    'la navigation de l’accueil doit utiliser le même point de rupture',
  );
  assert.match(
    homepage,
    /html\{scroll-behavior:smooth;scroll-padding-top:86px;-webkit-text-size-adjust:100%;text-size-adjust:100%\}/,
    'la page d’accueil doit conserver une taille de texte stable sur Safari mobile',
  );
  assert.match(ownerStylesheet, /@media\(max-width:760px\)/, 'le tableau de bord propriétaire doit rester adapté sur mobile');
});

test('le bandeau WOOD est animé avec un repli réduit et accessible', async () => {
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(homepage, /class="ticker-track"/);
  assert.match(homepage, /@keyframes woodTicker/);
  assert.match(homepage, /prefers-reduced-motion:reduce/);
  assert.match(homepage, /class="sr-only"/);
});

test('la grille mobile conserve deux colonnes lisibles et un repli étroit', async () => {
  const boutiqueStylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const mobileStylesheet = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');

  assert.match(boutiqueStylesheet, /@media\(max-width:500px\)\{\.product-grid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(mobileStylesheet, /\.product-grid\s*\{\s*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(mobileStylesheet, /@media \(max-width: 350px\)[\s\S]*?\.product-grid\s*\{\s*grid-template-columns:\s*1fr/);
});

test('la grille catalogue garde trois colonnes sur desktop et tablette', async () => {
  const boutiqueStylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');

  assert.match(boutiqueStylesheet, /\.product-grid\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(boutiqueStylesheet, /\.product-grid\{grid-auto-rows:1fr\}/);
});

test('la fiche générique passe en une colonne avant la largeur des téléphones étroits', async () => {
  const boutiqueStylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  assert.match(
    boutiqueStylesheet,
    /@media\(max-width:900px\)\{[\s\S]*?\.product-detail__intro\{grid-template-columns:minmax\(0,1fr\)[^}]*\}/,
    'la fiche générique ne doit pas conserver sa grille desktop sur un téléphone',
  );
});
