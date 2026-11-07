import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const [data, widget, styles, engine, hostinger, pagesBuild, homepage, checkout] = await Promise.all([
  read('wood-advisor-data.js'),
  read('wood-advisor.js'),
  read('wood-advisor.css'),
  read('wood-advisor-engine.js'),
  read('scripts/prepare-hostinger.mjs'),
  read('scripts/prepare-github-pages.mjs'),
  read('index.html'),
  read('checkout.html'),
]);

test('le catalogue conseiller reste local, vérifiable et sans profil persistant', () => {
  assert.match(data, /WoodAdvisorData/);
  assert.match(data, /fleurs|resines|bien-etre|wood-shop/iu);
  assert.match(data, /verified:\s*false/iu);
  assert.doesNotMatch(data, /localStorage|sessionStorage|fetch\s*\(/iu);
});

test('le moteur et le widget se parlent sans fabriquer une promesse', () => {
  assert.match(widget, /WoodAdvisorEngine/);
  assert.match(widget, /WoodAdvisorData/);
  assert.match(widget, /buildQuestionPlan|nextQuestion/);
  assert.match(widget, /Besoin d’aide pour choisir/u);
  assert.match(widget, /Passer/);
  assert.match(widget, /Retour/);
  assert.match(widget, /aria-modal="true"/u);
  assert.match(widget, /sessionState/);
  assert.doesNotMatch(widget, /localStorage|sessionStorage|fetch\s*\(/iu);
  assert.match(engine, /faits vérifiés|fait vérifié|descriptive/iu);
});

test('le widget est mobile-first, décoratif et compatible reduced motion', () => {
  assert.match(styles, /position:\s*fixed/iu);
  assert.match(styles, /env\(safe-area-inset-bottom/iu);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/iu);
  assert.match(styles, /pointer-events:\s*none/iu);
  assert.match(styles, /bottom-nav|mobile-nav/iu);
});

test('les assets du conseiller sont publiés et injectés dans la démo seulement', () => {
  for (const value of [
    'wood-advisor-data.js',
    'wood-advisor-engine.js',
    'wood-advisor.js',
    'wood-advisor.css',
    'assets/graffiti/wood-advisor-bubble.svg',
  ]) {
    assert.match(hostinger, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'u'));
  }
  assert.match(pagesBuild, /wood-advisor.css/);
  assert.match(pagesBuild, /checkout.html|compte.html|confirmation.html/);
  assert.match(homepage, /<main/);
  assert.doesNotMatch(checkout, /wood-advisor.js/);
});
