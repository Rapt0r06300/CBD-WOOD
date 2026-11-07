import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const gate = await readFile(new URL('../docs/validation/2026-11-07-cro-100-consumer-compliance-gate.md', import.meta.url), 'utf8').catch(() => '');
const checkout = await readFile(new URL('../checkout.html', import.meta.url), 'utf8');

test('CRO-100 garde les informations de vente derrière une validation complète', () => {
  for (const term of ['vendeur', 'prix TTC', 'CGV', 'rétractation', 'livraison', 'politique de confidentialité', 'pending']) {
    assert.match(gate, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(gate, /validation\s+propriétaire/iu);
  assert.match(gate, /aucun achat réel/u);
  assert.match(checkout, /simulation locale|paiement.*désactivé/isu);
});
