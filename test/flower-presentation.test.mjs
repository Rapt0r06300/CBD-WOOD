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
  ['fleurs-nimbus-3000', 'Nimbus 3000', 'nimbus-3000.png'],
  ['fleurs-ivory', 'Ivory', 'ivory.png'],
  ['fleurs-velvet-kush', 'Velvet Kush', 'velvet-kush.png'],
  ['fleurs-pastraweed', 'Pastraweed', 'pastraweed.png'],
  ['fleurs-euphoria', 'Euphoria', 'euphoria.png'],
  ['fleurs-purple', 'Purple', 'purple.png'],
  ['fleurs-bloody-mary', 'Bloody Mary', 'bloody-mary.png'],
  ['fleurs-cosmic-cbg', 'Cosmic CBG', 'cosmic-cbg.png'],
  ['fleurs-charlotte', 'Charlotte', 'charlotte.png'],
  ['fleurs-rainbow', 'Rainbow', 'rainbow.png'],
  ['fleurs-orange-bud', 'Orange Bud', 'orange-bud.png'],
  ['fleurs-plutonium', 'Plutonium', 'plutonium.png'],
  ['fleurs-fanta-hazy', 'Fanta Hazy', 'fanta-hazy.png'],
];

test('le registre de présentation conserve les 13 noms exacts', async () => {
  assert.equal(Object.keys(presentations.all()).length, flowers.length);
  for (const [id, name, filename] of flowers) {
    const entry = presentations.get(id);
    assert.ok(entry, `Présentation absente pour ${id}`);
    assert.equal(entry.name, name);
    assert.equal(entry.image, `assets/products/fleurs/${filename}`);
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
});
