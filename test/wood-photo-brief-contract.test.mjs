import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [brief, contract, register, mediaContract, homepage] = await Promise.all([
  readFile(new URL('../docs/design/wood-photo-brief.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/design/wood-product-photo-contract.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/design/wood-asset-register.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/design/wood-supabase-media-contract.md', import.meta.url), 'utf8'),
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
]);

test('le brief distingue la scène démo sous cloche de la photo produit approuvée', () => {
  for (const source of [brief, contract, register, mediaContract]) {
    assert.match(source, /demo-cloche/iu);
    assert.match(source, /demo-clean-view/iu);
  }
  assert.match(brief, /sous cloche en verre/iu);
  assert.match(brief, /deuxième vue nette hors cloche/iu);
  assert.match(contract, /approved-real-photo/iu);
  assert.match(contract, /ne dépend jamais d'un hover/iu);
});

test('la règle photo approuvée reste sans cloche', () => {
  assert.match(brief, /photo produit approuvée[^\n]*produit réel seul/iu);
  assert.match(contract, /Pour une photo approuvée,[\s\S]*?sans bocal,[\s\S]*?cloche/iu);
  assert.match(register, /photo réelle approuvée sans bocal ni cloche/iu);
});

test('la démo expose une scène sous cloche et une seconde vue distincte', () => {
  assert.match(homepage, /wood-campaign__media[\s\S]*wood-drop-studio\.webp/iu);
  assert.match(homepage, /wood-runway-card__media[\s\S]*<img[^>]+>[^<]*<\/div>/iu);
  assert.match(homepage, /Vue alternative de démonstration/iu);
  assert.match(homepage, /PHOTOS RÉELLES, PRIX ET STOCKS À VALIDER/iu);
});
