import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import test from 'node:test';

const presentation = await import('../flower-presentation.js');

test('le contrat photo sépare les 13 démonstrations des futures photos approuvées', async () => {
  const contract = await readFile(new URL('../docs/design/wood-product-photo-contract.md', import.meta.url), 'utf8');
  const brief = await readFile(new URL('../docs/design/wood-photo-brief.md', import.meta.url), 'utf8');
  const register = await readFile(new URL('../docs/design/wood-asset-register.md', import.meta.url), 'utf8');
  const storefront = await readFile(new URL('../storefront.js', import.meta.url), 'utf8');
  const flowerDetail = await readFile(new URL('../flower-detail.js', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et statut des médias',
    'Direction photo et formats',
    'Raccordement et états de secours',
    'Responsive, accessibilité et sécurité',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }
  const entries = Object.values(presentation.default?.all?.() || presentation.all?.() || {});
  assert.equal(entries.length, 13);
  for (const entry of entries) {
    await access(new URL(`../${entry.image}`, import.meta.url), constants.R_OK);
    assert.match(register, new RegExp(`\| ${entry.name} \|`));
    assert.match(register, /\| demo \|/u);
  }
  for (const ratio of ['1:1', '4:5', '3:2', 'WebP']) assert.match(brief, new RegExp(ratio.replace(':', '\\:')));
  assert.match(brief, /sans bocal, cloche, sachet ou accessoire/iu);
  assert.match(brief, /source.*autorisation|autorisation.*source/iu);
  assert.match(storefront, /productVisual/);
  assert.match(storefront, /Photo de démonstration|Illustration/iu);
  assert.match(flowerDetail, /photo réelle à venir/iu);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
