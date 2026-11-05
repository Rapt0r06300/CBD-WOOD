import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const inventory = await readFile(new URL('../docs/ops/data-inventory.md', import.meta.url), 'utf8');

test('l’inventaire couvre les données client, commande, paiement, e-mail et sauvegarde', () => {
  for (const term of ['Supabase Auth', 'customer_profiles', 'orders', 'order_items', 'historique append-only', 'notifications', 'documents PDF', 'newsletter', 'journaux', 'panier local']) {
    assert.match(inventory, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.match(inventory, /durées de conservation.*base juridique doivent encore être validés/isu);
  assert.match(inventory, /refresh token/iu);
  assert.match(inventory, /L’achat ne vaut pas consentement newsletter/iu);
});
