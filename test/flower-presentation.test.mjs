import test from 'node:test';
import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = resolve(import.meta.dirname, '..');
const presentations = require('../flower-presentation.js');

const flowers = [
  ['fleurs-nimbus-3000', 'Nimbus 3000', 'fleurs-nimbus-3000.webp'],
  ['fleurs-ivory', 'Ivory', 'fleurs-ivory.webp'],
  ['fleurs-velvet-kush', 'Velvet Kush', 'fleurs-velvet-kush.webp'],
  ['fleurs-pastraweed', 'Pastraweed', 'fleurs-pastraweed.webp'],
  ['fleurs-euphoria', 'Euphoria', 'fleurs-euphoria.webp'],
  ['fleurs-purple', 'Purple', 'fleurs-purple.webp'],
  ['fleurs-bloody-mary', 'Bloody Mary', 'fleurs-bloody-mary.webp'],
  ['fleurs-cosmic-cbg', 'Cosmic CBG', 'fleurs-cosmic-cbg.webp'],
  ['fleurs-charlotte', 'Charlotte', 'fleurs-charlotte.webp'],
  ['fleurs-rainbow', 'Rainbow', 'fleurs-rainbow.webp'],
  ['fleurs-orange-bud', 'Orange Bud', 'fleurs-orange-bud.webp'],
  ['fleurs-plutonium', 'Plutonium', 'fleurs-plutonium.webp'],
  ['fleurs-fanta-hazy', 'Fanta Hazy', 'fleurs-fanta-hazy.webp'],
];

test('le registre de présentation conserve les 13 noms exacts', async () => {
  assert.equal(Object.keys(presentations.all()).length, flowers.length);
  for (const [id, name, filename] of flowers) {
    const entry = presentations.get(id);
    assert.ok(entry, `Présentation absente pour ${id}`);
    assert.equal(entry.name, name);
    assert.equal(entry.image, `assets/flowers/${filename}`);
    assert.match(entry.demoDescription, /\p{Extended_Pictographic}/u);
    await access(resolve(root, entry.image), constants.R_OK);
  }
});

test('le registre est branché avant les rendus boutique et fiche produit', async () => {
  const fleurs = await readFile(resolve(root, 'fleurs.html'), 'utf8');
  const detail = await readFile(resolve(root, 'fleur.html'), 'utf8');
  const storefront = await readFile(resolve(root, 'storefront.js'), 'utf8');
  const detailScript = await readFile(resolve(root, 'flower-detail.js'), 'utf8');
  assert.match(fleurs, /src="flower-presentation\.js"/);
  assert.match(detail, /src="flower-presentation\.js"/);
  assert.match(storefront, /WoodFlowerPresentation/);
  assert.match(detailScript, /WoodFlowerPresentation/);
  assert.match(storefront, /WoodFlowerPresentation\?\.get\(product\.slug \|\| product\.id\)/);
});

test('les visuels de maquette suivent la direction photo sans contenant', () => {
  const entries = Object.values(presentations.all());
  assert.equal(entries.filter(entry => entry.image.endsWith('.webp')).length, flowers.length);
  for (const entry of entries) {
    assert.doesNotMatch(`${entry.image} ${entry.demoDescription}`, /sous cloche|bocal|street/i);
  }
});

test('les 13 fleurs conservent leurs propres tarifs de la carte WOOD', async () => {
  const catalogue = await readFile(resolve(root, 'fleurs.html'), 'utf8');
  const expected = {
    'fleurs-nimbus-3000': [15, 42, 70, 130, 260],
    'fleurs-ivory': [15, 42, 70, 130, 260],
    'fleurs-velvet-kush': [12, 34, 55, 100, 200],
    'fleurs-pastraweed': [12, 34, 55, 100, 200],
    'fleurs-euphoria': [12, 34, 55, 100, 200],
    'fleurs-purple': [11, 30, 50, 100, 180],
    'fleurs-bloody-mary': [10, 28, 45, 80, 160],
    'fleurs-cosmic-cbg': [10, 28, 45, 80, 160],
    'fleurs-charlotte': [10, 28, 45, 80, 160],
    'fleurs-rainbow': [8, 22, 35, 60, 120],
    'fleurs-orange-bud': [7, 20, 30, 50, 100],
    'fleurs-plutonium': [7, 20, 30, 50, 100],
    'fleurs-fanta-hazy': [6, 16, 25, 40, 80],
  };
  for (const [id, prices] of Object.entries(expected)) {
    const block = catalogue.match(new RegExp(`<article[^>]+data-product-id="${id}"[\\s\\S]*?<\\/article>`))?.[0];
    assert.ok(block, `Carte absente pour ${id}`);
    assert.deepEqual(
      [...block.matchAll(/data-price="(\d+)"/g)].map((match) => Number(match[1])),
      prices,
      `Tarifs incorrects pour ${id}`,
    );
  }
});
