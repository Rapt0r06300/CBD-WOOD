import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildMimeMessage,
  calculateRetryAt,
  isRetryableError,
  normalizeEmail,
} from './core.mjs';

test('normalizes a customer email without changing its identity', () => {
  assert.equal(normalizeEmail('  Client@Example.FR '), 'client@example.fr');
  assert.equal(normalizeEmail('not-an-email'), null);
});

test('calculates bounded exponential retry times', () => {
  const base = new Date('2026-11-05T12:00:00.000Z');
  assert.equal(calculateRetryAt(1, base).toISOString(), '2026-11-05T12:00:30.000Z');
  assert.equal(calculateRetryAt(2, base).toISOString(), '2026-11-05T12:01:30.000Z');
  assert.equal(calculateRetryAt(20, base).toISOString(), '2026-11-05T13:00:00.000Z');
});

test('classifies temporary provider failures as retryable', () => {
  assert.equal(isRetryableError({ status: 429 }), true);
  assert.equal(isRetryableError({ status: 503 }), true);
  assert.equal(isRetryableError({ status: 400 }), false);
  assert.equal(isRetryableError({ code: 'invalid_grant' }), false);
});

test('builds a MIME email with a PDF attachment and no secret material', () => {
  const raw = buildMimeMessage({
    from: 'WOOD <woodcbdshop@gmail.com>',
    to: 'client@example.fr',
    subject: 'Votre commande WOOD',
    text: 'Votre commande est enregistrée.',
    html: '<p>Votre commande est enregistrée.</p>',
    attachment: {
      filename: 'commande-WOOD-1001.pdf',
      contentType: 'application/pdf',
      content: Uint8Array.from([37, 80, 68, 70]),
    },
  });

  assert.match(raw, /^From: WOOD <woodcbdshop@gmail.com>\r\n/m);
  assert.match(raw, /^To: client@example.fr\r\n/m);
  assert.match(raw, /Content-Type: multipart\/mixed;/);
  assert.match(raw, /filename="commande-WOOD-1001\.pdf"/);
  assert.match(raw, /JVBERg==/);
  assert.doesNotMatch(raw, /refresh|service_role|secret/i);
});
