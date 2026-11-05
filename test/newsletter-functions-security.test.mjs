import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const subscribe = await readFile(new URL('../supabase/functions/newsletter-subscribe/index.ts', import.meta.url), 'utf8');
const unsubscribe = await readFile(new URL('../supabase/functions/newsletter-unsubscribe/index.ts', import.meta.url), 'utf8');
const provider = await readFile(new URL('../supabase/functions/newsletter-provider-events/index.ts', import.meta.url), 'utf8');

test('newsletter subscribe writes through the service role and requires consent', () => {
  assert.match(subscribe, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(subscribe, /NEWSLETTER_UNSUBSCRIBE_SECRET/);
  assert.match(subscribe, /validateSubscription/);
  assert.match(subscribe, /consent_status.*subscribed/s);
  assert.match(subscribe, /normalized_email/);
  assert.match(subscribe, /newsletter_suppressions/);
  assert.match(subscribe, /ne peut pas être réinscrite/);
  assert.doesNotMatch(subscribe, /GMAIL_REFRESH_TOKEN/);
  assert.doesNotMatch(subscribe, /is_test/);
});

test('newsletter unsubscribe uses a hashed token and a generic response', () => {
  assert.match(unsubscribe, /hashToken/);
  assert.match(unsubscribe, /parseSignedUnsubscribeToken/);
  assert.match(unsubscribe, /NEWSLETTER_UNSUBSCRIBE_SECRET/);
  assert.match(unsubscribe, /unsubscribe_token_hash/);
  assert.match(unsubscribe, /consent_status.*unsubscribed/s);
  assert.match(unsubscribe, /La demande a été prise en compte/);
  assert.doesNotMatch(unsubscribe, /client_email|normalized_email.*introuvable/i);
});

test('provider events are token-protected and idempotent before suppressing marketing', () => {
  assert.match(provider, /x-newsletter-provider-token/);
  assert.match(provider, /NEWSLETTER_PROVIDER_EVENTS_TOKEN/);
  assert.match(provider, /process_newsletter_provider_event/);
  assert.match(provider, /duplicate: data === false/);
  assert.doesNotMatch(provider, /SUPABASE_ANON_KEY/);
});
