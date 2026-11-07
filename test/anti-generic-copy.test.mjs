import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const generic = await readFile(new URL('../docs/validation/2026-11-07-anti-generic-review.md', import.meta.url), 'utf8');
const nonCopy = await readFile(new URL('../docs/validation/2026-11-07-anti-tealer-copy.md', import.meta.url), 'utf8');
const identity = await readFile(new URL('../docs/design/wood-direction-register.md', import.meta.url), 'utf8');
const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('la passe anti-générique et anti-copie garde des marqueurs WOOD', () => {
  for (const marker of ['Accueil', 'Fleurs', 'Résines', 'Bien-être', 'WOOD Shop', 'Boutiques', 'Fiches', 'Footer/contact']) {
    assert.match(generic, new RegExp(`\\| ${marker} \\|`, 'u'));
  }
  assert.match(nonCopy, /Mécanismes adaptés/iu);
  assert.match(nonCopy, /Éléments exclus/iu);
  assert.match(identity, /Aucune couleur TealerLab|non-copie/iu);
  assert.doesNotMatch(homepage, /TealerLab|tealerlab/iu);
});
