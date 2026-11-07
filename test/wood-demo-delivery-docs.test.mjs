import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('la séparation et la revue propriétaire sont documentées sans promesse de publication', async () => {
  const separation = await readFile(new URL('../docs/validation/2026-11-07-cro-preview-separation.md', import.meta.url), 'utf8');
  const walkthrough = await readFile(new URL('../docs/validation/2026-11-07-demo-owner-walkthrough.md', import.meta.url), 'utf8');
  assert.match(separation, /origin\/main/u);
  assert.match(separation, /`demo\//u);
  assert.match(separation, /publication.*externe/iu);
  assert.match(walkthrough, /00:00–02:00/u);
  assert.match(walkthrough, /recherche, tri, aperçu rapide/iu);
  assert.match(walkthrough, /photos réelles/iu);
});
