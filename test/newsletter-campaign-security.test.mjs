import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../supabase/functions/newsletter-campaign/index.ts', import.meta.url), 'utf8');

test('newsletter campaign worker is server-only and Gmail-secret based', () => {
  assert.match(source, /x-newsletter-worker-token/);
  assert.match(source, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(source, /GMAIL_CLIENT_SECRET/);
  assert.match(source, /GMAIL_REFRESH_TOKEN/);
  assert.match(source, /NEWSLETTER_UNSUBSCRIBE_SECRET/);
  assert.match(source, /populate_newsletter_campaign/);
  assert.match(source, /claim_newsletter_deliveries/);
  assert.match(source, /newsletter_delivery_attempts/);
  assert.doesNotMatch(source, /SUPABASE_ANON_KEY/);
});

test('newsletter worker requires a sending campaign and updates only its lease', () => {
  assert.match(source, /campaign\.status !== "sending"/);
  assert.match(source, /eq\("processing_by", workerId\)/);
  assert.match(source, /status: "accepted"/);
  assert.match(source, /buildNewsletterMessage/);
});

test('newsletter worker handles empty audiences and Gmail failures safely', () => {
  assert.match(source, /remainingBeforeSend/);
  assert.match(source, /processed: 0/);
  assert.match(source, /action: "reconnect_gmail"/);
  assert.match(source, /status: "paused"/);
  assert.match(source, /campaign\.scheduled_at/);
  assert.match(source, /eq\("status", "scheduled"\)/);
});
