import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');

test('le runway éditorial ne répète pas le coup de projecteur de la sélection', () => {
  const runway = homepage.match(/<section class="wood-runway"[\s\S]*?<\/section>/u)?.[0] ?? '';
  assert.match(runway, /Euphoria|Purple|Bloody Mary|Orange Bud/iu);
  assert.doesNotMatch(runway, /Nimbus 3000|Ivory|Velvet Kush|Pastraweed/iu);
  assert.match(runway, /Explorer la fiche/iu);
});
