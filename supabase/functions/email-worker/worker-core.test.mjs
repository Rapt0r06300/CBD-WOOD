import assert from 'node:assert/strict';
import test from 'node:test';

import { processEmailJob } from './worker-core.mjs';

const job = {
  id: 7,
  order_id: 'order-1',
  notification_kind: 'order_created',
  recipient_email: 'client@example.fr',
  attempts: 1,
  template_key: 'order-created',
  template_version: 1,
};

const message = {
  from: 'WOOD <woodcbdshop@gmail.com>',
  subject: 'Commande WOOD 1001',
  text: 'Commande enregistrée.',
  html: '<p>Commande enregistrée.</p>',
};

test('marks an accepted job as sent and records the provider id', async () => {
  const calls = [];
  const result = await processEmailJob(job, {
    loadMessage: async () => message,
    sendMessage: async (raw) => {
      calls.push({ type: 'send', raw });
      return { id: 'provider-1' };
    },
    recordAttempt: async (value) => calls.push({ type: 'attempt', value }),
    markSent: async (value) => calls.push({ type: 'sent', value }),
    markFailed: async () => assert.fail('markFailed should not run'),
    now: new Date('2026-11-05T12:00:00.000Z'),
  });

  assert.equal(result.status, 'sent');
  assert.equal(calls[0].type, 'send');
  assert.equal(calls[1].value.status, 'accepted');
  assert.equal(calls[1].value.providerMessageId, 'provider-1');
  assert.equal(calls[2].value.providerMessageId, 'provider-1');
});

test('returns a retry schedule for a temporary provider failure', async () => {
  const calls = [];
  const result = await processEmailJob(job, {
    loadMessage: async () => message,
    sendMessage: async () => {
      const error = new Error('quota');
      error.status = 429;
      throw error;
    },
    recordAttempt: async (value) => calls.push({ type: 'attempt', value }),
    markSent: async () => assert.fail('markSent should not run'),
    markFailed: async (value) => calls.push({ type: 'failed', value }),
    now: new Date('2026-11-05T12:00:00.000Z'),
  });

  assert.equal(result.status, 'retry');
  assert.equal(calls[0].value.status, 'deferred');
  assert.equal(calls[1].value.status, 'pending');
  assert.equal(calls[1].value.availableAt.toISOString(), '2026-11-05T12:00:30.000Z');
});

test('dead-letters a permanent provider failure without retrying forever', async () => {
  const calls = [];
  const result = await processEmailJob({ ...job, attempts: 5 }, {
    loadMessage: async () => message,
    sendMessage: async () => {
      const error = new Error('invalid grant');
      error.status = 401;
      error.code = 'invalid_grant';
      throw error;
    },
    recordAttempt: async (value) => calls.push({ type: 'attempt', value }),
    markSent: async () => assert.fail('markSent should not run'),
    markFailed: async (value) => calls.push({ type: 'failed', value }),
    now: new Date('2026-11-05T12:00:00.000Z'),
  });

  assert.equal(result.status, 'dead_letter');
  assert.equal(calls[0].value.status, 'rejected');
  assert.equal(calls[1].value.status, 'dead_letter');
});
