import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../supabase/functions/notification-retry/index.ts', import.meta.url), 'utf8');
const dashboard = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');
const page = await readFile(new URL('../compte.html', import.meta.url), 'utf8');

test('la reprise des notifications est réservée à une session propriétaire', () => {
  assert.match(source, /auth\.getUser/);
  assert.match(source, /owner_users/);
  assert.match(source, /dead_letter/);
  assert.match(source, /status.*pending/);
  assert.match(source, /processing_by.*null/);
  assert.doesNotMatch(source, /SUPABASE_ANON_KEY/);
});

test('la propriétaire voit une action de reprise sans écriture directe sur l’outbox', () => {
  assert.match(dashboard, /data-owner-notification-retry/);
  assert.match(dashboard, /functions\/v1\/notification-retry/);
  assert.match(page, /ownerNotificationMessage/);
  assert.doesNotMatch(dashboard, /order_notification_outbox['"]\)\.update/);
});
