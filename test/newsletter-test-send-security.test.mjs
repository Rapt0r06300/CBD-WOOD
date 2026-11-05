import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../supabase/functions/newsletter-test-send/index.ts', import.meta.url), 'utf8');
const control = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');
const migration = await readFile(new URL('../supabase/migrations/20261105200000_newsletter_template_activation.sql', import.meta.url), 'utf8');

test('newsletter test send is owner-only, server-configured, and isolated from the live audience', () => {
  assert.match(source, /auth\.getUser\(accessToken\)/);
  assert.match(source, /owner_users/);
  assert.match(source, /NEWSLETTER_TEST_RECIPIENT/);
  assert.match(source, /NEWSLETTER_CAN_SEND/);
  assert.match(source, /is_test: true/);
  assert.match(source, /action: "test_send"/);
  assert.match(source, /buildNewsletterMessage/);
  assert.match(source, /sendGmailRawMessage/);
  assert.doesNotMatch(source, /payload\.recipient|payload\.email|recipient_email.*payload/i);
  assert.doesNotMatch(source, /newsletter_deliveries/);
});

test('owner dashboard sends the test through its dedicated server function', () => {
  assert.match(control, /newsletter-test-send/);
  assert.match(control, /action === 'test_send'/);
  assert.match(control, /Aucun client réel n’a été ciblé/);
});

test('template activation and test-send audit action are schema-guarded', () => {
  assert.match(migration, /test_send/);
  assert.match(migration, /activate_newsletter_template/);
  assert.match(migration, /active = false/);
  assert.match(migration, /active = true/);
});
