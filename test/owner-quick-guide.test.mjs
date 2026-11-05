import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const guide = await readFile(new URL('../docs/ops/owner-quick-guide.md', import.meta.url), 'utf8');
const dashboard = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');

test('le guide propriétaire couvre la routine sans inventer de connexion externe', () => {
  for (const term of ['Commandes', 'Corriger l’adresse', 'Relancer', 'Ajouter un produit', 'non achetable', 'Viva']) {
    assert.match(guide, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'iu'));
  }
  assert.doesNotMatch(guide, /password\s*[:=]|secret\s*[:=]|refresh_token\s*[:=]/iu);
  assert.match(dashboard, /owner_update_order_status/);
  assert.match(dashboard, /owner_update_order_address/);
  assert.match(dashboard, /notification-retry/);
});
