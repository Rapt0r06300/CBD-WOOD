import assert from 'node:assert/strict';
import test from 'node:test';

import { buildNewsletterMessage, deliveryOutcome, eligibleSubscribers } from './core.mjs';

test('newsletter audience contains only explicit active subscribers', () => {
  assert.deepEqual(eligibleSubscribers([
    { id: '1', normalized_email: ' A@EXAMPLE.FR ', consent_status: 'subscribed' },
    { id: '2', normalized_email: 'off@example.fr', consent_status: 'unsubscribed' },
    { id: '3', normalized_email: 'invalid', consent_status: 'subscribed' },
  ]).map((subscriber) => subscriber.normalized_email), ['a@example.fr']);
});

test('newsletter message includes a signed unsubscribe link in text and html', async () => {
  const message = await buildNewsletterMessage({
    campaign: { subject: 'WOOD — nouveautés' },
    subscriber: { id: '11111111-1111-4111-8111-111111111111', normalized_email: 'client@example.fr' },
    textBody: 'Bonjour',
    htmlBody: '<p>Bonjour</p>',
    from: 'WOOD <woodcbdshop@gmail.com>',
    unsubscribeUrl: 'https://example.supabase.co/functions/v1/newsletter-unsubscribe',
    unsubscribeSecret: 's'.repeat(48),
  });
  assert.equal(message.to, 'client@example.fr');
  assert.match(message.text, /Se désinscrire/);
  assert.match(message.html, /newsletter-unsubscribe\?token=/);
});

test('newsletter failures defer temporary errors and stop after the attempt limit', () => {
  assert.equal(deliveryOutcome({ error: { status: 503 }, attempts: 1 }).status, 'deferred');
  assert.equal(deliveryOutcome({ error: { status: 400 }, attempts: 1 }).status, 'failed');
  assert.equal(deliveryOutcome({ error: { status: 503 }, attempts: 5 }).status, 'failed');
});
