import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const doc = await readFile(new URL('../docs/ops/viva-wallet.md', import.meta.url), 'utf8');

test('la préparation Viva documente les états sûrs et les scénarios critiques', () => {
  for (const state of ['pending', 'paid', 'failed', 'refunded']) assert.match(doc, new RegExp('\\\\| `'+state+'` \\\\|', 'u'));
  for (const scenario of ['webhook réussi', 'refus Viva', 'abandon', 'deux fois', 'montant ou devise divergents', 'expiration', 'remboursement']) {
    assert.match(doc, new RegExp(scenario.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(doc, /retour du navigateur n’est jamais une transition/iu);
  assert.match(doc, /aucun faux paiement/iu);
});
