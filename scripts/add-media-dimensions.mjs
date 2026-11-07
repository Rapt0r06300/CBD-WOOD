import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const dimensions = {
  'wood-campaign-collage': [1536, 1024],
  'wood-hero-cloche': [1536, 1024],
  'wood-texture-dome': [1536, 1024],
  'wood-drop-studio': [1672, 941],
  'wood-jar-detail': [1122, 1402],
  'wood-comic-sprite': [1024, 683],
};
const htmlFiles = (await readdir('.')).filter(name => name.endsWith('.html'));
let changed = 0;
let images = 0;

function getDimensions(src) {
  const filename = src.split('/').pop()?.split('?')[0] ?? '';
  const basename = filename.replace(/\.[^.]+$/u, '');
  if (src.includes('assets/flowers/')) return [768, 768];
  if (src.includes('assets/editorial/wood-resin-concept-')) return [1024, 1024];
  return dimensions[basename] ?? null;
}

for (const file of htmlFiles) {
  const path = join('.', file);
  const source = await readFile(path, 'utf8');
  const updated = source.replace(/<img\b[^>]*>/giu, tag => {
    const src = tag.match(/\bsrc="([^"]+)"/iu)?.[1];
    if (!src || /\bwidth="/iu.test(tag) || /\bheight="/iu.test(tag)) return tag;
    const size = getDimensions(src);
    if (!size) return tag;
    images += 1;
    return tag.replace(/\s*\/?>$/u, ' width="' + size[0] + '" height="' + size[1] + '"$&');
  });
  if (updated !== source) {
    await writeFile(path, updated);
    changed += 1;
  }
}

console.log('Media dimensions: ' + images + ' image(s) normalized across ' + changed + ' page(s).');
