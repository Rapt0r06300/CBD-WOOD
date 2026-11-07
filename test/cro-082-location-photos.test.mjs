import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(new URL('../rendez-vous.html', import.meta.url), 'utf8');
const styles = await readFile(new URL('../wood-visit.css', import.meta.url), 'utf8');
const control = await readFile(new URL('../docs/validation/2026-11-07-cro-082-location-photos.md', import.meta.url), 'utf8').catch(() => '');

test('CRO-082 réserve une scène photo distincte pour chaque boutique', () => {
  for (const location of ['barla', 'borriglione']) {
    assert.match(page, new RegExp(`data-location-photo-slot="${location}"`, 'u'));
    assert.match(page, new RegExp(`data-location-photo-state="pending"`, 'u'));
  }
  assert.match(page, /PHOTO BOUTIQUE · À FOURNIR/gu);
  assert.match(page, /Angle d’arrivée \+ enseigne lisible/gu);
  assert.match(page, /photo de remplacement autorisée/iu);
});

test('CRO-082 garde le fallback sans photo et son reflow mobile', () => {
  assert.match(styles, /wood-visit-location__photo/iu);
  assert.match(styles, /@media\(max-width:620px\)[\s\S]*wood-visit-location__photo/iu);
  for (const term of ['droits', 'fallback', 'BLOCKED-EXTERNAL', 'pending']) {
    assert.match(control, new RegExp(term.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&'), 'iu'));
  }
  assert.doesNotMatch(page, /assets\/owner|owner-materials|photo-6-novembre/iu);
});

