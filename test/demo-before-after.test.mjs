import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const report = await readFile(new URL('../docs/validation/2026-11-07-demo-before-after.md', import.meta.url), 'utf8');

test('la planche avant-après couvre les scènes client essentielles', () => {
  for (const scene of ['Hero accueil', 'Galerie fleurs', 'Fiche fleur', 'Résines', 'Boutiques', 'Mobile complet']) {
    assert.match(report, new RegExp(`\\| ${scene} \\|`, 'u'));
  }
  assert.match(report, /Recommandation client/iu);
  assert.match(report, /validation propriétaire/iu);
  assert.match(report, /captures ne remplacent pas[\s\S]*validation/iu);
});
