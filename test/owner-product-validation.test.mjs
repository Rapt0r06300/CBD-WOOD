import assert from 'node:assert/strict';
import test from 'node:test';
import { validateProductDraft } from '../owner-product-validation.mjs';

const validFlowerTiers = [1, 3, 5, 10, 25].map(grams => ({ grams, value: '10', price_cents: 1000 }));

test('le tableau propriétaire accepte un produit cohérent avec un stock entier', () => {
  assert.equal(validateProductDraft({
    name: 'Nimbus 3000',
    category: 'fleurs',
    stockValue: '12',
    tiers: validFlowerTiers,
  }), '');
});

test('le tableau propriétaire refuse un stock fractionnaire ou négatif', () => {
  const base = { name: 'Nimbus 3000', category: 'fleurs', tiers: validFlowerTiers };
  assert.match(validateProductDraft({ ...base, stockValue: '1.5' }), /nombre entier/i);
  assert.match(validateProductDraft({ ...base, stockValue: '-1' }), /positif ou nul/i);
});

test('le tableau propriétaire refuse un prix renseigné invalide', () => {
  assert.match(validateProductDraft({
    name: 'Huile WOOD',
    category: 'bien-etre',
    priceValue: 'pas-un-prix',
    stockValue: '2',
  }), /prix doit être valide/i);
});

test('les fleurs exigent exactement les cinq paliers de la carte WOOD', () => {
  assert.match(validateProductDraft({
    name: 'Nimbus 3000',
    category: 'fleurs',
    stockValue: '4',
    tiers: validFlowerTiers.slice(0, 4),
  }), /cinq tarifs fleurs.*1 g.*3 g.*5 g.*10 g.*25 g/i);
});

test('une catégorie inconnue ne peut pas être enregistrée', () => {
  assert.match(validateProductDraft({ name: 'Test', category: 'inconnue', stockValue: '0' }), /catégorie valide/i);
});
