import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const css = await readFile(new URL('../wood-mobile-finish.css', import.meta.url), 'utf8');
const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const demoMode = await readFile(new URL('../demo-mode.js', import.meta.url), 'utf8');
const guide = await readFile(new URL('../docs/validation/2026-11-07-mobile-action-proximity.md', import.meta.url), 'utf8');

test('les actions mobiles restent dans le flux avec une zone tactile stable', () => {
  assert.match(css, /body\.has-mobile-app-nav\s*\{[\s\S]*padding-bottom:/u);
  assert.match(css, /main \[id\],\s*footer\s*\{[\s\S]*scroll-margin-bottom:/u);
  assert.match(css, /\.buttons,[\s\S]*\.location-card__actions \.buttons,[\s\S]*gap:\s*10px/u);
  assert.match(css, /\.buttons \.btn,[\s\S]*min-height:\s*48px/u);
  assert.match(css, /\.wood-runway-card__footer\s*\{[\s\S]*min-height:\s*44px/u);
  assert.doesNotMatch(css, /position:\s*(?:fixed|sticky)[^}]*\.wood-(?:proof|runway|mood|pack|contact)/iu);
});

test('les routes de démo proposent une découverte et un contact, pas une vente sticky', () => {
  assert.match(index, /href="fleurs\.html"/u);
  assert.match(index, /href="contact\.html"/u);
  assert.doesNotMatch(index, /position:\s*(?:fixed|sticky)[^}]*add-to-cart/iu);
  assert.match(demoMode, /isDemo/u);
  assert.match(demoMode, /form\.noValidate\s*=\s*true/u);
  assert.match(demoMode, /control\.disabled\s*=\s*true/u);
  assert.match(demoMode, /createOrderButton/u);
});

test('la preuve documente les largeurs, le clavier, le tactile et le zoom', () => {
  for (const term of ['320', '360', '375', '390', '430', 'clavier', 'tactile', 'zoom', 'iOS/Android']) {
    assert.match(guide, new RegExp(term.replace('/', '\\/'), 'iu'));
  }
});
