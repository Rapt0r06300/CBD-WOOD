import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../boutique.js', import.meta.url), 'utf8');

test('le panier nettoie les données locales avant de les réutiliser', () => {
  assert.match(source, /const normalizeCartItem = item =>/);
  assert.match(source, /const normalizeCart = value => Array\.isArray\(value\)/);
  assert.match(source, /const normalized = normalizeCart\(value\)/);
  assert.match(source, /localStorage\.setItem\(STORAGE_KEY, JSON\.stringify\(normalized\)\)/);
  assert.match(source, /Math\.min\(MAX_CART_QUANTITY, quantity\)/);
});

test('le panier échappe les valeurs réinjectées dans son HTML', () => {
  assert.match(source, /const escapeHtml = value =>/);
  assert.match(source, /escapeHtml\(item\.name\)/);
  assert.match(source, /escapeHtml\(item\.category/);
  assert.match(source, /escapeHtml\(priceLabel\(item\)\)/);
});

test('le panier reste synchronisé entre onglets et conserve un parcours clavier fermé', () => {
  assert.match(source, /window\.addEventListener\('storage'/);
  assert.match(source, /event\.key !== STORAGE_KEY/);
  assert.match(source, /event\.key !== 'Tab'/);
  assert.match(source, /panel\.classList\.contains\('is-open'\)/);
  assert.match(source, /last\.focus\(\{ preventScroll: true \}\)/);
  assert.match(source, /first\.focus\(\{ preventScroll: true \}\)/);
});

test('un panier vide ne propose pas un lien de checkout focalisable', () => {
  assert.match(source, /checkout\.setAttribute\('aria-disabled', String\(empty\)\)/);
  assert.match(source, /checkout\.tabIndex = empty \? -1 : 0/);
});
