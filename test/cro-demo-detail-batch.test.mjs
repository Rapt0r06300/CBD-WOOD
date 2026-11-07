import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [homepage, shop, detail, motion, motionCss, variants, variantScript, variantCss] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../wood-shop.html', import.meta.url), 'utf8'),
  readFile(new URL('../flower-detail.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-motion.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-motion.css', import.meta.url), 'utf8'),
  readFile(new URL('../docs/design/cro-home-variants.md', import.meta.url), 'utf8'),
  readFile(new URL('../wood-home-variants.js', import.meta.url), 'utf8'),
  readFile(new URL('../wood-home-variants.css', import.meta.url), 'utf8'),
]);

test('la revue A/B WOOD reste hors ligne et compare deux compositions sans collecte', () => {
  assert.match(variants, /Variante A/u);
  assert.match(variants, /Variante B/u);
  assert.match(variants, /hors ligne|offline/iu);
  assert.match(variants, /aucune collecte|sans collecte/iu);
  assert.match(variants, /grille de sélection/iu);
});

test('les variantes A/B sont accessibles uniquement par URL de revue et restent sans instrumentation', () => {
  assert.match(homepage, /wood-home-variants\.css/u);
  assert.match(homepage, /wood-home-variants\.js/u);
  assert.match(variantScript, /wood-variant/iu);
  assert.match(variantScript, /wood-home-variant-a/u);
  assert.match(variantScript, /wood-home-variant-b/u);
  assert.doesNotMatch(variantScript, /analytics|track|cookie|fetch\(/iu);
  assert.match(variantCss, /wood-home-variant-a/u);
  assert.match(variantCss, /wood-home-variant-b/u);
});

test('la homepage relie les univers par des transitions éditoriales courtes', () => {
  assert.match(homepage, /data-wood-transition="univers-selection"/u);
  assert.match(homepage, /data-wood-transition="selection-mood"/u);
  assert.match(homepage, /data-wood-transition="mood-boutique"/u);
  assert.doesNotMatch(homepage.match(/data-wood-transition="[^"]+"[\s\S]{0,500}/gu)?.join('\n') || '', /\b(?:module|composant)\b/iu);
});

test('WOOD Shop sépare explicitement textile et objets/accessoires', () => {
  assert.match(shop, /wood-shop-family[^>]+data-family="textile"/u);
  assert.match(shop, /wood-shop-family[^>]+data-family="accessoires"/u);
  assert.match(shop, /TEXTILE WOOD/u);
  assert.match(shop, /OBJETS &amp; ACCESSOIRES/u);
  assert.match(shop, /wood-shop-family[^>]+data-family="textile"/u);
  assert.match(shop, /wood-shop-family[^>]+data-family="accessoires"/u);
});

test('la fiche fleur affiche les faits connus, les inconnus et une FAQ contextualisée', () => {
  assert.match(detail, /flower-detail__verified-facts/u);
  assert.match(detail, /data-fact-state="demo"/u);
  assert.match(detail, /Source|Provenance/u);
  assert.match(detail, /flower-detail__texture/u);
  assert.match(detail, /FAQ de cette fiche/u);
  assert.match(detail, /ne remplace pas un conseil professionnel/u);
});

test('la scène WOOD prévoit une entrée graffiti vers la cloche, désactivable', () => {
  assert.match(motion, /initClocheReveal/u);
  assert.match(motion, /wood-cloche-reveal/u);
  assert.match(motion, /prefers-reduced-motion/u);
  assert.match(motionCss, /@keyframes woodClocheReveal/u);
  assert.match(motionCss, /wood-cloche-reveal/u);
});
