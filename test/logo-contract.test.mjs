import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const publicPages = [
  'index.html',
  'wood-shop.html',
  'fleurs.html',
  'resines.html',
  'bien-etre.html',
  'fleur.html',
  'produit.html',
  'compte.html',
  'checkout.html',
  'contact.html',
  'confirmation.html',
  '404.html'
];

test('le contrat logo relie le fichier original aux variantes autorisées', async () => {
  const contract = await readFile(new URL('../docs/design/wood-logo-contract.md', import.meta.url), 'utf8');
  const pages = await Promise.all(publicPages.map(page => readFile(new URL(`../${page}`, import.meta.url), 'utf8')));

  for (const heading of ['Source et intégrité', 'Routes et variantes', 'Responsive et accessibilité', 'États et fallback', 'Preuve et rollback']) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  assert.match(contract, /assets\/wood-mark\.svg/);
  assert.match(contract, /sans déformation|preserveAspectRatio/u);
  assert.match(contract, /aucun logo externe|aucune branche inventée/u);

  for (const [index, page] of pages.entries()) {
    if (['confirmation.html', '404.html'].includes(publicPages[index])) continue;
    assert.match(page, /assets\/wood-mark\.svg\?v=wood-logo-original-exact-20261103/iu, `${publicPages[index]} doit utiliser le logo versionné`);
    assert.match(page, /aria-label="WOOD CBD Nice, accueil"/u, `${publicPages[index]} doit nommer le lien de marque`);
    assert.match(page, /alt="" aria-hidden="true"/u, `${publicPages[index]} doit garder le mark décoratif hors du doublon vocal`);
  }
  assert.match(contract, /404.*repli/u);
});
