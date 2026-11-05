import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(new URL('../supabase/migrations/20261105210000_newsletter_suppression_and_provider_events.sql', import.meta.url), 'utf8');
const policy = await readFile(new URL('../supabase/migrations/20261105220000_newsletter_suppression_policy.sql', import.meta.url), 'utf8');

test('newsletter suppression schema protects permanent provider failures', () => {
  assert.match(migration, /create table if not exists public\.newsletter_suppressions/);
  assert.match(migration, /permanent_bounce/);
  assert.match(migration, /complaint/);
  assert.match(migration, /create table if not exists public\.newsletter_provider_events/);
  assert.match(migration, /unique \(normalized_email\)/);
  assert.match(migration, /on conflict \(provider_event_id\) do nothing/);
  assert.match(migration, /consent_status = 'suppressed'/);
  assert.match(migration, /alter table public\.newsletter_suppressions enable row level security/);
  assert.match(policy, /newsletter_suppressions_public_deny/);
  assert.match(policy, /newsletter_provider_events_public_deny/);
  assert.match(policy, /using \(false\)/g);
});
