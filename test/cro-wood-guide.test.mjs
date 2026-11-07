import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const styles = await readFile(new URL('../wood-guide.css', import.meta.url), 'utf8');

test('le guide WOOD reste pédagogique, local et non médical', () => {
  const section = homepage.match(/<section[^>]+id="guide-wood"[\s\S]*?<\/section>/u)?.[0] || '';
  assert.equal((section.match(/class="wood-guide__item"/g) || []).length, 3);
  for (const anchor of ['#univers', '#selection-wood', '#boutique']) assert.ok(section.includes(anchor), `ancre absente: ${anchor}`);
  assert.match(section, /Fleur ou résine/iu);
  assert.match(section, /Lire une carte WOOD/iu);
  assert.match(section, /stock en temps réel/iu);
  assert.doesNotMatch(section, /soigne|guérit|effet garanti|dosage/iu);
  assert.match(section, /data-state="demo"/u);
});

test('le guide se replie en accordéon lisible sur mobile', () => {
  assert.match(styles, /grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)/u);
  assert.match(styles, /@media \(max-width: 850px\)[\s\S]*grid-template-columns:\s*1fr/u);
  assert.match(styles, /prefers-reduced-motion: reduce/u);
  assert.match(styles, /summary::-webkit-details-marker/u);
});
