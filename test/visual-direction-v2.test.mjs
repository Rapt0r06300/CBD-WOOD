import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const direction = await readFile(new URL('../docs/design/wood-visual-direction-v2.md', import.meta.url), 'utf8');

test('la direction v2 définit les trois niveaux de hiérarchie et les tokens visuels', () => {
  for (const marker of [
    'impact commercial',
    'récit éditorial',
    'information de confiance',
    '--wood-ink',
    '--wood-lime',
    '--wood-surface',
    '1440px',
    'mobile',
  ]) {
    assert.match(direction, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
});

test('la direction protège les zones commerciales et prévoit le retrait des décorations', () => {
  assert.match(direction, /prix|stock|paiement/iu);
  assert.match(direction, /aria-hidden/iu);
  assert.match(direction, /prefers-reduced-motion/iu);
  assert.match(direction, /photos de démonstration/iu);
  assert.match(direction, /ne copie pas|ne pas copier/iu);
});
