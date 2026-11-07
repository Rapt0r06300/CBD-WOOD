import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [home, evidence] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../docs/validation/2026-11-07-cro-first-viewport.md', import.meta.url), 'utf8'),
]);

test('le hero garde une proposition compacte et deux intentions distinctes', () => {
  assert.match(home, /Une autre vision du chanvre\. Une sélection qui a du caractère\. Et surtout, de vrais conseils/iu);
  assert.match(home, /href="#univers" class="btn primary"/u);
  assert.match(home, /href="#boutique" class="btn secondary"/u);
  assert.match(evidence, /une seule phrase de valeur/iu);
  assert.match(evidence, /CTA\s+principal anis/iu);
  assert.match(evidence, /CTA\s+secondaire bordé/iu);
  assert.match(evidence, /hauteur tactile minimale de 48 px/iu);
});
