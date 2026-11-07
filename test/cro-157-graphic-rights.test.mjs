import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const registry = JSON.parse(await readFile(new URL('../docs/validation/2026-11-07-cro-157-graphic-rights-registry.json', import.meta.url), 'utf8'));
const roadmap = await readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8');

test('le registre graphique trace source autorisation et statut de publication', () => {
  assert.ok(registry.length >= 20);
  for (const asset of registry) {
    assert.ok(asset.id && asset.type && asset.source && asset.authorization && asset.status);
    assert.ok(['demo-only', 'pending', 'approved', 'blocked'].includes(asset.status));
    if (asset.status !== 'approved') assert.notEqual(asset.publishAs, 'official');
    if (asset.type === 'photo' && asset.status !== 'approved') assert.notEqual(asset.publishAs, 'real');
  }
});

test('le registre refuse les contenus propriétaires non fournis comme preuve publique', () => {
  const pendingOwnerAssets = registry.filter(asset => asset.authorization === 'owner-validation-required');
  assert.ok(pendingOwnerAssets.length >= 1);
  assert.ok(pendingOwnerAssets.every(asset => asset.status === 'pending'));
  assert.match(roadmap, /\[x\] \*\*CRO-157/u);
});
