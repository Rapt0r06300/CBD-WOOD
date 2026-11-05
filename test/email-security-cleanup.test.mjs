import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(new URL('../supabase/migrations/20261105110000_email_security_cleanup.sql', import.meta.url), 'utf8');

test('customer ownership helper is private and RLS reads are consolidated', () => {
  assert.match(migration, /create schema if not exists private/i);
  assert.match(migration, /private\.customer_owns_order/);
  assert.match(migration, /drop function if exists public\.customer_owns_order/i);
  assert.match(migration, /create policy invoice_documents_read/);
  assert.match(migration, /create policy delivery_events_read/);
  assert.match(migration, /create policy newsletter_subscribers_read/);
  assert.doesNotMatch(migration, /create policy invoice_documents_customer_read/);
  assert.doesNotMatch(migration, /create policy delivery_events_customer_read/);
  assert.doesNotMatch(migration, /create policy newsletter_subscribers_self_read/);
});

test('foreign-key support indexes are present for the new operational tables', () => {
  for (const index of [
    'delivery_events_created_by_idx',
    'email_templates_created_by_idx',
    'newsletter_campaigns_created_by_idx',
    'newsletter_deliveries_subscriber_idx',
    'newsletter_subscribers_user_idx',
  ]) assert.match(migration, new RegExp(index));
});
