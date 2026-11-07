import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const manifest = await readFile(new URL('../docs/validation/2026-11-07-google-review-sources.md', import.meta.url), 'utf8');
const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const control = await readFile(new URL('../docs/validation/2026-11-07-cro-074-establishment-review-separation.md', import.meta.url), 'utf8');

test('CRO-074 associe chaque fiche à son établissement et conserve la source directe', () => {
  assert.match(manifest, /Barla[\s\S]*magasin\.tel\/f\/cbd-nice-wood-shop-cbd-nice-barla-14353109\//u);
  assert.match(manifest, /Borriglione[\s\S]*magasin-de-cannabis\.autour-de-moi\.com\/f\/cbd-nice-wood-shop-cbd-nice-borriglione-14353446\//u);
  assert.match(manifest, /7 rue Barla[\s\S]*06300 Nice/u);
  assert.match(manifest, /16 avenue Alfred Borriglione[\s\S]*06100 Nice/u);
  assert.match(manifest, /auteur public/u);
  assert.match(manifest, /autorisation/u);
  assert.match(control, /zéro mélange/iu);
  assert.match(control, /lien direct/iu);
  assert.match(control, /adresse/iu);
  assert.match(control, /pending/iu);
  assert.match(control, /owner|propriétaire/iu);
});

test('CRO-074 garde la preuve publique en attente tant que les avis ne sont pas revalidés', () => {
  const proof = homepage.match(/<section[^>]+id="preuve"[\s\S]*?<\/section>/u)?.[0] ?? '';
  assert.match(proof, /AVIS GOOGLE · À REVALIDER/u);
  assert.match(proof, /En attente de validation WOOD/u);
  assert.doesNotMatch(proof, /5,0|5\/5|Borriglione|Barla · Google|Lou Z\.|Dede F\.|Gabriel G\.|Fabienne|magasin\.tel|autour-de-moi/u);
});
