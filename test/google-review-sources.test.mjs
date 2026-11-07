import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifest = fs.readFileSync(path.join(root, 'docs/validation/2026-11-07-google-review-sources.md'), 'utf8');
const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

test('Google review source manifest keeps establishment, date, source and pending status', () => {
  assert.match(manifest, /needs-owner-revalidation/u);
  assert.match(manifest, /magasin\.tel\/f\/cbd-nice-wood-shop-cbd-nice-barla/u);
  assert.match(manifest, /magasin-de-cannabis\.autour-de-moi\.com\/f\/cbd-nice-wood-shop-cbd-nice-borriglione/u);
  assert.match(manifest, /Barla/u);
  assert.match(manifest, /Borriglione/u);
  assert.match(manifest, /14 mai 2026/u);
  assert.match(manifest, /29 mai 2026/u);
  assert.match(manifest, /auteur public/u);
  assert.match(manifest, /autorisation/u);
});

test('Google review source manifest rejects an unqualified 5/5 publication claim', () => {
  assert.match(manifest, /Ne pas afficher de note globale/u);
  assert.match(manifest, /tous les avis sont 5\/5/u);
  assert.match(manifest, /aucun extrait Borriglione n’est affiché/u);
});

test('demo proof does not publish an unqualified global rating or unverified Borriglione excerpts', () => {
  const proof = homepage.match(/<section[^>]+id="preuve"[\s\S]*?<\/section>/u)?.[0] ?? '';
  assert.match(proof, /AVIS GOOGLE · EXTRAITS À REVALIDER/u);
  assert.doesNotMatch(proof, /5,0|Cinq étoiles sur cinq|Borriglione/u);
  assert.match(proof, /validation WOOD en attente/u);
  assert.match(proof, /data-proof-reviews/u);
});
