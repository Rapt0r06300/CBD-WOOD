import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const subscribe = await readFile(new URL('../supabase/functions/newsletter-subscribe/index.ts', import.meta.url), 'utf8');
const unsubscribe = await readFile(new URL('../supabase/functions/newsletter-unsubscribe/index.ts', import.meta.url), 'utf8');

test('newsletter subscribe writes through the service role and requires consent', () => {
  assert.match(subscribe, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(subscribe, /validateSubscription/);
  assert.match(subscribe, /consent_status.*subscribed/s);
  assert.match(subscribe, /normalized_email/);
  assert.doesNotMatch(subscribe, /GMAIL_REFRESH_TOKEN/);
});

test('newsletter unsubscribe uses a hashed token and a generic response', () => {
  assert.match(unsubscribe, /hashToken/);
  assert.match(unsubscribe, /unsubscribe_token_hash/);
  assert.match(unsubscribe, /consent_status.*unsubscribed/s);
  assert.match(unsubscribe, /La demande a été prise en compte/);
  assert.doesNotMatch(unsubscribe, /client_email|normalized_email.*introuvable/i);
});
