import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const policy = await readFile(new URL('../docs/validation/2026-11-07-cro-102-age-information.md', import.meta.url), 'utf8').catch(() => '');
const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const checkout = await readFile(new URL('../checkout.html', import.meta.url), 'utf8');

test('CRO-102 documente l’âge par catégorie sans présenter un simple pop-up comme contrôle', () => {
  for (const category of ['Fleurs', 'Résines', 'Huiles', 'Cosmétiques', 'Comestibles', 'Accessoires']) {
    assert.match(policy, new RegExp(category, 'iu'));
  }
  for (const term of ['réglementation', 'conseil juridique', 'pending', 'contrôle final', 'visiteur autorisé']) {
    assert.match(policy, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(policy, /simple pop-up/iu);
  assert.doesNotMatch(`${homepage}\n${checkout}`, /J['’]ai\s+18\s+ans|18\s*\+/iu);
});
