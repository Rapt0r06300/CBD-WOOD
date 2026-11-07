import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const [rights, manifest, roadmap] = await Promise.all([
  readFile(new URL('docs/validation/2026-11-07-cro-157-graphic-rights-registry.json', root), 'utf8'),
  readFile(new URL('scripts/prepare-hostinger.mjs', root), 'utf8'),
  readFile(new URL('docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', root), 'utf8'),
]);

const registry = JSON.parse(rights);
const publicFilesBlock = manifest.match(/const PUBLIC_FILES = \[(.*?)\];/su)?.[1] || '';
const publicFiles = [...publicFilesBlock.matchAll(/'([^']+)'/gu)].map(match => match[1]);
const textFiles = publicFiles.filter(file => /\.(?:html|css|js|mjs)$/u.test(file));
const publicText = await Promise.all(textFiles.map(file => readFile(new URL(file, root), 'utf8')));

test('TXW-111 trace les assets WOOD et exclut les médias tiers', () => {
  assert.ok(registry.length >= 20, 'le registre doit couvrir le pack graphique');
  for (const asset of registry) {
    assert.match(asset.source, /^assets\//u);
    assert.notEqual(asset.authorization, 'unknown');
    assert.notEqual(asset.authorization, 'third-party');
  }
  const pending = registry.find(asset => asset.id === 'graffiti-comic-sprite');
  assert.equal(pending?.authorization, 'owner-validation-required');
  assert.equal(pending?.status, 'pending');
  for (const source of publicText) {
    assert.doesNotMatch(source, /<img[^>]+(?:src|srcset)=["']https?:/iu);
    assert.doesNotMatch(source, /url\(\s*["']?https?:/iu);
  }
  assert.match(roadmap, /^- \[x\] \*\*TXW-111 —/mu);
});
