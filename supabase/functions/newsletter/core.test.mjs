import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createUnsubscribeToken,
  hashToken,
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
