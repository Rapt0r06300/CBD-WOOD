import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('checkout section keeps the shared container gutters', async () => {
  const stylesheet = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const adminStylesheet = await readFile(new URL('../admin.css', import.meta.url), 'utf8');

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
  assert.match(
    adminStylesheet,
    /html\{scroll-behavior:smooth;-webkit-text-size-adjust:100%;text-size-adjust:100%\}/,
    'l’espace propriétaire doit conserver une taille de texte stable sur Safari mobile',
  );
});
