import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getOwnerMediaPreview, getOwnerMediaStatus } from '../owner-media.mjs';

const account = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
const dashboard = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');
const media = await readFile(new URL('../owner-media.mjs', import.meta.url), 'utf8');

test('le statut média distingue photo à fournir et chemin renseigné', () => {
  assert.deepEqual(getOwnerMediaStatus({ image_path: '' }), { kind: 'missing', label: 'Photo à fournir' });
  assert.deepEqual(getOwnerMediaStatus({ image_path: 'assets/products/fleurs/nimbus.webp' }), { kind: 'configured', label: 'Photo renseignée' });
});

test('les produits sans photo utilisent une illustration WOOD distincte et signalée', () => {
  assert.deepEqual(getOwnerMediaPreview({ name: 'Nimbus 3000', slug: 'nimbus-3000', category: 'fleurs', image_path: '' }), {
    src: 'assets/flowers/fleurs-nimbus-3000.webp',
    alt: 'Illustration de démonstration de Nimbus 3000',
    isDemo: true,
  });
});

test('le tableau de bord expose le statut média sans proposer un faux upload', () => {
  assert.match(account, /<th[^>]*>Média<\/th>/iu);
  assert.match(media, /Photo à fournir/iu);
  assert.match(dashboard, /getOwnerMediaStatus/iu);
  assert.match(dashboard, /data-label="Média"/iu);
  assert.doesNotMatch(account, /type="file"/iu);
});
