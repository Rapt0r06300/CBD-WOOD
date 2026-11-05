import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const monitoring = await readFile(new URL('../docs/ops/monitoring.md', import.meta.url), 'utf8');

test('le plan de supervision couvre les chemins qui peuvent perdre une commande', () => {
  for (const term of ['404', 'Edge Function', 'commandes bloquées', 'outbox e-mail', 'document PDF', 'stock']) {
    assert.match(monitoring, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(monitoring, /jamais une\s+adresse complète, un token, une clé/iu);
  assert.match(monitoring, /ne confirme jamais un paiement/iu);
  assert.match(monitoring, /seuils et le canal.*propriétaire/isu);
});
