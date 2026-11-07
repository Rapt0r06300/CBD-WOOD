import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const brief = await readFile(new URL('../docs/validation/2026-11-07-cro-053-store-sequence.md', import.meta.url), 'utf8').catch(() => '');

test('CRO-053 réserve les cinq séquences boutique et leurs fallbacks', () => {
  const gallery = homepage.match(/<div class="wood-store-gallery"[\s\S]*?<\/div>\s*<\/div>/u)?.[0] ?? '';
  for (const slot of ['facade', 'plantes', 'etageres', 'stickers', 'accueil']) {
    assert.match(gallery, new RegExp(`data-store-slot="${slot}"`, 'u'));
  }
  assert.equal((gallery.match(/PHOTO BOUTIQUE À REMPLACER/gu) ?? []).length, 5);
  assert.match(gallery, /fallback démo/iu);
  assert.match(gallery, /aucune photo réelle de boutique n’est présentée comme validée/iu);
});

test('CRO-053 documente responsable, statut et remplacement pour chaque slot', () => {
  for (const slot of ['façade', 'plantes', 'étagères', 'stickers', 'accueil']) {
    assert.match(brief, new RegExp(slot, 'iu'));
  }
  for (const term of ['attente', 'fallback', 'propriétaire', 'droits', 'ratio', 'alt']) {
    assert.match(brief, new RegExp(term, 'iu'));
  }
});
