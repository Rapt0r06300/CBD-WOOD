import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat des grilles WOOD conserve trois produits desktop et quatre cases mobile', async () => {
  const contract = await readFile(new URL('../docs/design/wood-grid-contract.md', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const mobile = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');
  const responsive = await readFile(new URL('../responsive.css', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source de vérité',
    'Rythme desktop, tablette et mobile',
    'États de données et repli',
    'Accessibilité et performance',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }

  assert.match(boutique, /\.product-grid\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(boutique, /\.product-grid\{grid-auto-rows:1fr\}/);
  assert.match(boutique, /\.product-card\{display:flex;flex-direction:column/);
  assert.match(mobile, /@media \(max-width: 500px\)[\s\S]*?\.product-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)/);
  assert.match(mobile, /@media \(max-width: 350px\)[\s\S]*?\.product-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr/);
  assert.match(mobile, /\.product-grid \.product-meta[\s\S]*?grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(mobile, /\.product-grid \.product-meta \.add-to-cart[\s\S]*?width: 100%/);
  assert.match(boutique, /\.product-related__grid\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(boutique, /@media\(max-width:700px\)[\s\S]*?\.product-related__grid\{grid-template-columns:repeat\(2,minmax\(0,1fr\)/);
  assert.match(boutique, /@media\(max-width:350px\)[\s\S]*?\.product-related__grid\{grid-template-columns:1fr\}/);
  assert.match(responsive, /body\s*\{[\s\S]*?overflow-x: hidden/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
