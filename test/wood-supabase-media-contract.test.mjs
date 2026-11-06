import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getOwnerMediaPreview, getOwnerMediaStatus } from '../owner-media.mjs';

const contract = await readFile(new URL('../docs/design/wood-supabase-media-contract.md', import.meta.url), 'utf8');
const register = await readFile(new URL('../docs/design/wood-asset-register.md', import.meta.url), 'utf8');
const media = await readFile(new URL('../owner-media.mjs', import.meta.url), 'utf8');
const dashboard = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');
const account = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
const catalogHydration = await readFile(new URL('../catalog-demo-hydration.js', import.meta.url), 'utf8');

test('le contrat sépare média démo, approuvé et photo réelle', () => {
  assert.match(contract, /Périmètre et statuts/iu);
  assert.match(contract, /demo/iu);
  assert.match(contract, /approved/iu);
  assert.match(contract, /photo réelle/iu);
  assert.match(register, /\| demo \|/u);
  assert.match(register, /passer un asset de `demo` à `approved`/iu);
  assert.match(register, /sans bocal ni cloche/iu);
  assert.match(catalogHydration, /demo|illustration de démonstration/iu);
});

test('les fallbacks owner sont déterministes et les chemins externes sont filtrés', () => {
  assert.match(contract, /Source de vérité et fallback/iu);
  assert.deepEqual(getOwnerMediaStatus({ image_path: '' }), { kind: 'missing', label: 'Photo à fournir' });
  assert.deepEqual(getOwnerMediaStatus({ image_path: 'assets/products/fleurs/nimbus.webp' }), { kind: 'configured', label: 'Photo renseignée' });
  assert.deepEqual(getOwnerMediaPreview({ name: 'Nimbus 3000', slug: 'nimbus-3000', category: 'fleurs', image_path: '' }), {
    src: 'assets/flowers/fleurs-nimbus-3000.webp',
    alt: 'Illustration de démonstration de Nimbus 3000',
    isDemo: true,
  });
  assert.match(media, /safeRelativeAsset/);
  assert.match(media, /assets\/[a-z0-9_./-]+/iu);
  assert.doesNotMatch(media, /https?:\/\//iu);
});

test('le contrat protège les alternatives, le responsive et la frontière upload/Storage', () => {
  assert.match(contract, /Alt text, responsive et accessibilité/iu);
  assert.match(contract, /Upload et Storage/iu);
  assert.match(dashboard, /preview\.alt/);
  assert.match(dashboard, /data-label="Média"/);
  assert.match(account, /<th[^>]*>Média<\/th>/iu);
  assert.doesNotMatch(account, /type="file"/iu);
  assert.doesNotMatch(dashboard, /storage_path/iu);
  assert.match(contract, /fichier absent|donnée manquante/iu);
});

test('le contrat documente preuve, validation humaine et rollback fichier par fichier', () => {
  assert.match(contract, /Preuve, validation humaine et rollback/iu);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /rollback fichier par fichier/iu);
  assert.match(contract, /Supabase production|Storage réel/iu);
  assert.match(register, /rollback doit rester possible fichier par fichier/iu);
});
