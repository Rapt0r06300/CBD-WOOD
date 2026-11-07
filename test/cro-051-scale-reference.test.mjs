import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const detail = await readFile(new URL('../flower-detail.js', import.meta.url), 'utf8');
const styles = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
const control = await readFile(new URL('../docs/validation/2026-11-07-cro-051-scale-reference.md', import.meta.url), 'utf8').catch(() => '');

test('CRO-051 réserve un repère d’échelle neutre sur la fiche fleur', () => {
  assert.match(detail, /data-scale-reference-state="pending"/u);
  assert.match(detail, /Repère physique neutre/iu);
  assert.match(detail, /Aucune mesure publiée/iu);
  assert.match(styles, /flower-detail__scale-reference/iu);
});

test('CRO-051 bloque toute échelle présentée comme authentique sans source', () => {
  for (const term of ['photo autorisée', 'référence physique', 'pending', 'mesure authentique', 'propriétaire']) {
    assert.match(control, new RegExp(term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'iu'));
  }
  assert.doesNotMatch(detail, /data-scale-reference-state="approved"/u);
});

