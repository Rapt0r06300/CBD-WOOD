import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const editorialCss = await readFile(new URL('../wood-editorial.css', import.meta.url), 'utf8');

test('la galerie boutique réserve les trois scènes WOOD sans inventer de photo réelle', () => {
  assert.match(homepage, /class="wood-store-gallery"[\s\S]*data-state="demo"/u);
  for (const slot of ['facade', 'plantes', 'etageres']) {
    assert.match(homepage, new RegExp(`data-store-slot="${slot}"`, 'u'));
  }
  assert.match(homepage, /PHOTO BOUTIQUE À REMPLACER/gu);
  assert.match(homepage, /fallback démo/iu);
  assert.match(homepage, /photos réelles.*validation|validation.*photos réelles/isu);
});

test('la galerie boutique reste cadrée et adaptée au mobile', () => {
  for (const selector of ['.wood-store-gallery', '.wood-store-gallery__grid', '.wood-store-gallery__card']) {
    assert.match(editorialCss, new RegExp(selector.replace('.', '\\.'), 'u'));
  }
  assert.match(editorialCss, /@media[^{}]*max-width\s*:\s*760px[\s\S]*?wood-store-gallery/iu);
  assert.match(editorialCss, /prefers-reduced-motion[\s\S]*?wood-store-gallery/iu);
});
