import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const publicPages = [
  'index.html',
  'fleurs.html',
  'resines.html',
  'bien-etre.html',
  'wood-shop.html',
  'fleur.html',
  'produit.html',
  'checkout.html',
  'compte.html',
  'confirmation.html',
];

const pages = await Promise.all(publicPages.map(async (page) => [
  page,
  await readFile(new URL(`../${page}`, import.meta.url), 'utf8'),
]));

test('les pages publiques ne chargent pas de couche promotionnelle ou de widget concurrent', () => {
  const forbiddenOverlayReferences = /(?:whatsapp|intercom|crisp|tawk|newsletter-modal|promo-popup|cookie-popup)/i;
  for (const [page, html] of pages) {
    assert.doesNotMatch(html, forbiddenOverlayReferences, `${page} ne doit pas empiler un widget ou une popup`);
  }

  const homepage = pages.find(([page]) => page === 'index.html')[1];
  assert.equal((homepage.match(/class="announcement"/g) || []).length, 1, 'un seul bandeau d’annonce est autorisé');
  assert.doesNotMatch(homepage, /<form[^>]+newsletter|newsletter[-_ ]?(?:popup|modal)/i);
});

test('les contraintes commerciales publiques restent sans retrait, QR code ou promotion', () => {
  for (const [page, html] of pages) {
    assert.doesNotMatch(html, /pickup|retrait en boutique|QR\s*code/i, `${page} ne doit pas réintroduire un parcours exclu`);
  }
  const publicCopy = pages.map(([, html]) => html).join('\n');
  assert.doesNotMatch(publicCopy, /voucher|coupon|promo(?:tion)?\b|prix barré|économie/i);
});

test('les placeholders WOOD Shop ne simulent ni prix ni disponibilité', () => {
  const shop = pages.find(([page]) => page === 'wood-shop.html')[1];
  for (const name of ['T-shirt WOOD', 'Vêtement WOOD', 'Produit dérivé']) {
    assert.match(shop, new RegExp(`data-product-name="${name.replace(' ', '\\s+')}"`));
  }
  assert.match(shop, /T-SHIRT \/ À VALIDER/);
  assert.match(shop, /Prix à renseigner/);
  assert.match(shop, /data-product-unavailable/);
  assert.doesNotMatch(shop, /data-price=|data-stock=|data-available=/i);
});
