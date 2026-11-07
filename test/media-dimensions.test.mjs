import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const dimensions = {
  'wood-campaign-collage': [1536, 1024],
  'wood-hero-cloche': [1536, 1024],
  'wood-texture-dome': [1536, 1024],
  'wood-drop-studio': [1672, 941],
  'wood-jar-detail': [1122, 1402],
  'wood-comic-sprite': [1024, 683],
};
const pages = (await readdir('.')).filter(name => name.endsWith('.html'));

function expectedSize(src) {
  if (src.includes('assets/flowers/')) return [768, 768];
  if (src.includes('assets/editorial/wood-resin-concept-')) return [1024, 1024];
  const basename = src.split('/').pop()?.split('?')[0]?.replace(/\.[^.]+$/u, '');
  return dimensions[basename] ?? null;
}

test('les médias raster locaux réservent leur géométrie', async () => {
  for (const page of pages) {
    const source = await readFile(page, 'utf8');
    for (const tag of source.match(/<img\b[^>]*>/giu) ?? []) {
      const src = tag.match(/\bsrc="([^"]+)"/iu)?.[1];
      const size = src ? expectedSize(src) : null;
      if (!size) continue;
      assert.match(tag, new RegExp('\\bwidth="' + size[0] + '"', 'u'), page + ': ' + src);
      assert.match(tag, new RegExp('\\bheight="' + size[1] + '"', 'u'), page + ': ' + src);
    }
  }
});
