import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const styles = await readFile(new URL('../wood-advisor.css', import.meta.url), 'utf8');

test('le conseiller redescend quand la navigation basse se masque', () => {
  assert.match(styles, /@media\s*\(max-width:800px\)[\s\S]*?\.wood-nav-hidden\s+\.wood-advisor\s*\{[\s\S]*?bottom:\s*calc\(env\(safe-area-inset-bottom,0px\)\s*\+\s*18px\)/u);
  assert.match(styles, /\.wood-advisor\s*\{[\s\S]*?transition:[^;]*bottom/u);
});
