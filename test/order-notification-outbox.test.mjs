import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(new URL('../supabase/migrations/20261104160000_order_notification_outbox.sql', import.meta.url), 'utf8');

test('la file de notifications persiste les e-mails sans exposer d’écriture publique', () => {
  assert.match(migration, /create table if not exists public\.order_notification_outbox/);
  assert.match(migration, /unique \(order_id, notification_kind\)/);
  assert.match(migration, /status text not null default 'pending'/);
  assert.match(migration, /alter table public\.order_notification_outbox enable row level security/);
  assert.match(migration, /revoke all on table public\.order_notification_outbox from public, anon, authenticated/);
  assert.match(migration, /grant all on table public\.order_notification_outbox to service_role/);
});

test('les notifications sont créées une seule fois après persistance de la commande ou du paiement', () => {
  assert.match(migration, /create or replace function public\.enqueue_order_notifications/);
  assert.match(migration, /notification_kind, recipient_email/);
  assert.match(migration, /'order_created'/);
  assert.match(migration, /'payment_confirmed'/);
  assert.match(migration, /on conflict \(order_id, notification_kind\) do nothing/);
  assert.match(migration, /create trigger orders_enqueue_notifications/);
});

test('le tableau de bord rend visibles les états de la file sans prétendre envoyer le mail', async () => {
  const dashboard = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');
  const account = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
  assert.match(account, /id="ownerNotificationsBody"/);
  assert.match(account, /L’envoi réel reste désactivé/);
  assert.match(dashboard, /order_notification_outbox/);
  assert.match(dashboard, /notificationStatusLabels/);
  assert.match(dashboard, /notificationsBody/);
});
