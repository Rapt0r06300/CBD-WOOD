import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../wood-engagement.js', import.meta.url), 'utf8').catch(() => '');
const styles = await readFile(new URL('../home-engagement.css', import.meta.url), 'utf8');

test('l’accueil prépare le pop-up WOOD sans activer de promotion réelle', () => {
  assert.match(homepage, /id="woodOfferPreview"[^>]*data-demo-only/);
  assert.match(homepage, /Aperçu démo/u);
  assert.match(homepage, /aucune offre active ni code saisi/iu);
  assert.match(homepage, /wood-engagement\.js\?v=wood-engagement-v2-20261105/u);
  assert.match(styles, /\.wood-offer-preview\{transform:translateX\(-50%\)\}/u);
  assert.doesNotMatch(homepage, /CODEPROMO|PROMO-[A-Z0-9]+/iu);
});

test('la notification d’activité reste une maquette et ne fabrique pas de client ou commande', () => {
  assert.match(homepage, /id="woodActivityPreview"[^>]*data-demo-only/);
  assert.match(homepage, /Exemple de notification d’activité/iu);
  assert.doesNotMatch(homepage, /vient d['’]acheter|nouvelle commande de [A-ZÀ-Ÿ]/iu);
  assert.match(script, /data-demo-only|woodActivityPreview/u);
  assert.match(script, /localStorage/u);
});

test('les aperçus flottants restent masqués tant qu’une action explicite ne les ouvre pas', () => {
  assert.match(homepage, /id="woodOfferPreview"[^>]*hidden[^>]*data-demo-only/u);
  assert.match(homepage, /id="woodActivityPreview"[^>]*hidden[^>]*data-demo-only/u);
  assert.match(script, /scrollY/u);
  assert.match(script, /wood-engagement-revealed/u);
  assert.doesNotMatch(script, /offer\.hidden = false/u);
  assert.doesNotMatch(script, /activity\.hidden = false/u);
  assert.match(styles, /wood-offer-preview\[hidden\]/u);
});
