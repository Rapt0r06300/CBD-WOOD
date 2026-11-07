import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('docs/validation/2026-11-07-cro-148-qr-manifest.json', root), 'utf8'));
const contract = await readFile(new URL('docs/validation/2026-11-07-cro-148-qr-links.md', root), 'utf8');

test('CRO-148 garde un lien QR par fiche publique et aucun accès admin', () => {
  assert.equal(manifest.status, 'pending-owner-approval');
  assert.equal(manifest.items.length, 13);
  const slugs = new Set(manifest.items.map((item) => item.slug));
  assert.equal(slugs.size, 13);
  for (const item of manifest.items) {
    assert.match(item.slug, /^fleurs-[a-z0-9-]+$/u);
    assert.match(item.path, /^fleur\.html\?produit=fleurs-[a-z0-9-]+$/u);
    assert.doesNotMatch(item.path, /admin|compte|checkout|supabase|token/iu);
  }
});

test('CRO-148 garde les QR imprimables derrière les droits et l approbation', () => {
  assert.match(contract, /Aucun QR imprimable/iu);
  assert.match(contract, /propriétaire/iu);
  assert.match(contract, /droits/iu);
  assert.match(contract, /slug/iu);
  assert.match(contract, /fallback/iu);
  assert.match(contract, /ne compte pas/iu);
});
