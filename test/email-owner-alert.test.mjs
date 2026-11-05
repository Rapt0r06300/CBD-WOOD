import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { buildOrderEmailMessage } from '../supabase/functions/email-worker/message.mjs';

const migration = await readFile(new URL('../supabase/migrations/20261105120000_owner_order_alerts.sql', import.meta.url), 'utf8');

const order = {
  order_number: 'WOOD-2026-0001',
  customer_name: 'Client WOOD',
  customer_email: 'client@example.com',
  status: 'pending',
  payment_status: 'pending',
  total_cents: 4200,
  delivery_address: '1 rue de Nice, 06300 Nice',
};

const items = [{ product_name: 'Nimbus 3000', grams: 3, quantity: 1, line_total_cents: 4200 }];

test('le worker sait construire une alerte de nouvelle commande pour la propriétaire', () => {
  const message = buildOrderEmailMessage({ order, items, kind: 'owner_order_alert' });
  assert.match(message.subject, /Nouvelle commande WOOD/);
  assert.match(message.text, /Client WOOD/);
  assert.match(message.text, /WOOD-2026-0001/);
  assert.match(message.html, /Commande reçue/);
});

test('la migration crée une alerte propriétaire après persistance sans exposer de secret', () => {
  assert.match(migration, /owner_order_alert/);
  assert.match(migration, /auth\.users/);
  assert.match(migration, /after insert or update of payment_status, status on public\.orders/);
  assert.match(migration, /on conflict \(order_id, notification_kind\) do nothing/);
  assert.doesNotMatch(migration, /GMAIL_CLIENT_SECRET|GMAIL_REFRESH_TOKEN|SUPABASE_SERVICE_ROLE_KEY/);
});
