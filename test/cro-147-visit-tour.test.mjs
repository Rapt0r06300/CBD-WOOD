import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const page = await readFile(new URL('rendez-vous.html', root), 'utf8');
const styles = await readFile(new URL('wood-visit.css', root), 'utf8');
const contract = await readFile(new URL('docs/validation/2026-11-07-cro-147-visit-tour.md', root), 'utf8');

test('CRO-147 fournit une visite photo statique avec fallback démonstration', () => {
  const tour = page.match(/<section[^>]+id="visite-photo"[\s\S]*?<\/section>/u)?.[0] ?? '';
  assert.match(tour, /data-visit-tour-state="demo"/u);
  assert.equal((tour.match(/<figure\b/gu) ?? []).length, 3);
  assert.equal((tour.match(/PHOTO DÉMO · À REMPLACER/gu) ?? []).length, 3);
  for (const asset of ['wood-texture-dome.webp', 'wood-jar-detail.webp', 'wood-campaign-collage.webp']) {
    assert.match(tour, new RegExp(asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'u'));
  }
});

test('CRO-147 garde la séquence lisible sur mobile et les droits en attente', () => {
  assert.match(styles, /wood-visit-tour/iu);
  assert.match(styles, /@media\(max-width:620px\)[\s\S]*wood-visit-tour/iu);
  assert.match(contract, /fallback statique/iu);
  assert.match(contract, /droits/iu);
  assert.match(contract, /photos réelles/iu);
});
