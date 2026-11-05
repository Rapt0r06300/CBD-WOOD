import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createUnsubscribeToken,
  createSignedUnsubscribeToken,
  hashToken,
  parseSignedUnsubscribeToken,
  validateSubscription,
  validateUnsubscribeToken,
} from './core.mjs';

test('requires explicit newsletter consent and normalizes the email', () => {
  assert.deepEqual(validateSubscription({
    email: ' Client@Example.FR ',
    consent: true,
    source: 'footer',
    consent_text_version: '2026-11-05',
  }), {
    ok: true,
    value: {
      email: 'client@example.fr',
      source: 'footer',
      consentTextVersion: '2026-11-05',
    },
  });
  assert.equal(validateSubscription({ email: 'client@example.fr', consent: false }).ok, false);
});

test('creates a high-entropy unsubscribe token and validates its shape', async () => {
  const token = createUnsubscribeToken();
  assert.equal(validateUnsubscribeToken(token), true);
  assert.equal(validateUnsubscribeToken('too-short'), false);
  assert.equal((await hashToken(token)).length, 64);
});

test('creates an expiring signed unsubscribe token without storing a raw secret', async () => {
  const secret = 's'.repeat(48);
  const subscriberId = '11111111-1111-4111-8111-111111111111';
  const token = await createSignedUnsubscribeToken({ subscriberId, secret, expiresAt: 2_000_000_000_000 });
  assert.deepEqual(await parseSignedUnsubscribeToken({ token, secret, now: 1_900_000_000_000 }), {
    subscriberId,
    expiresAt: 2_000_000_000_000,
  });
  assert.equal(await parseSignedUnsubscribeToken({ token, secret: 'x'.repeat(48), now: 1_900_000_000_000 }), null);
  assert.equal(await parseSignedUnsubscribeToken({ token, secret, now: 2_000_000_000_001 }), null);
});
