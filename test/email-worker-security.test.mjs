import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../supabase/functions/email-worker/index.ts', import.meta.url), 'utf8');

test('email worker requires a server-only invocation token and service role', () => {
  assert.match(source, /EMAIL_WORKER_TOKEN/);
  assert.match(source, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(source, /GMAIL_CLIENT_SECRET/);
  assert.match(source, /GMAIL_REFRESH_TOKEN/);
  assert.match(source, /x-email-worker-token/);
  assert.doesNotMatch(source, /woodcbdshop@gmail\.com.*password/i);
});

test('email worker never falls back to a public client key for queue writes', () => {
  assert.match(source, /claim_order_notification_jobs/);
  assert.match(source, /email_delivery_attempts/);
  assert.match(source, /processing_by/);
  assert.doesNotMatch(source, /SUPABASE_ANON_KEY/);
});

test('email worker refreshes Gmail before leasing queue jobs', () => {
  const tokenRefresh = source.indexOf('refreshGmailAccessToken({');
  const claim = source.indexOf('claim_order_notification_jobs');
  assert.ok(tokenRefresh > -1 && claim > -1 && tokenRefresh < claim);
});
