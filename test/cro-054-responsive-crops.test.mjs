import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [brief, contract, css, roadmap] = await Promise.all([
  readFile(new URL('../docs/design/wood-photo-brief.md', import.meta.url), 'utf8'),
  readFile(new URL('../docs/design/wood-product-photo-contract.md', import.meta.url), 'utf8'),
  readFile(new URL('../wood-photo-crops.css', import.meta.url), 'utf8'),
  readFile(new URL('../docs/roadmaps/2026-11-07-cbd-wood-509-tasks.md', import.meta.url), 'utf8'),
]);

test('CRO-054 documente les cadrages et leur ancrage responsive', () => {
  for (const ratio of ['1:1', '4:5', '3:2']) assert.match(brief, new RegExp(ratio, 'u'));
  for (const width of ['320', '375', '390', '430']) assert.match(brief, new RegExp(width, 'u'));
  assert.match(brief, /object-position/iu);
  assert.match(brief, /zone sûre.*8 %|8 %.*zone sûre/iu);
  assert.match(brief, /logo.*prix|prix.*logo/iu);
  assert.match(contract, /point focal|zone sûre/iu);
  assert.match(css, /--wood-photo-position/iu);
  assert.match(css, /object-position:\s*var\(--wood-photo-position/iu);
  assert.match(css, /--wood-photo-ratio:\s*1\s*\/\s*1/iu);
  assert.match(css, /--wood-photo-ratio:\s*4\s*\/\s*5/iu);
  assert.match(css, /--wood-photo-ratio:\s*3\s*\/\s*2/iu);
  assert.match(roadmap, /^- \[x\] \*\*CRO-054 —/mu);
});
