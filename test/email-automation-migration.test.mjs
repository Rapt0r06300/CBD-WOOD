import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(new URL('../supabase/migrations/20261105100000_email_automation_foundation.sql', import.meta.url), 'utf8');

test('email automation migration defines isolated transactional and marketing data', () => {
  for (const table of [
    'email_templates',
    'email_delivery_attempts',
    'invoice_documents',
    'delivery_events',
    'newsletter_subscribers',
    'newsletter_campaigns',
    'newsletter_deliveries',
    'newsletter_delivery_attempts',
  ]) {
    assert.match(migration, new RegExp(`create table if not exists public\\.${table}\\b`, 'i'));
    assert.match(migration, new RegExp(`alter table public\\.${table} enable row level security`, 'i'));
  }
  assert.match(migration, /payment_confirmed/);
  assert.match(migration, /invoice_ready/);
  assert.match(migration, /delivery_update/);
  assert.match(migration, /owner_order_alert/);
});

test('email automation migration claims jobs with a lease and skip-locked rows', () => {
  assert.match(migration, /create or replace function public\.claim_order_notification_jobs/i);
  assert.match(migration, /for update skip locked/i);
  assert.match(migration, /processing_until/i);
  assert.match(migration, /grant execute on function public\.claim_order_notification_jobs[\s\S]*to service_role/i);
});

test('newsletter migration requires explicit consent and supports suppression', () => {
  assert.match(migration, /consent_status text not null/i);
  assert.match(migration, /consented_at timestamptz/i);
  assert.match(migration, /unsubscribed_at timestamptz/i);
  assert.match(migration, /suppression_reason text/i);
  assert.match(migration, /unique \(normalized_email\)/i);
});
