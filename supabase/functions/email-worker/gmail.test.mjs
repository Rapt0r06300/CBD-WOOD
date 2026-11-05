import assert from 'node:assert/strict';
import test from 'node:test';

import { refreshGmailAccessToken, sendGmailRawMessage } from './gmail.mjs';

test('refreshes a Gmail access token without logging or returning the refresh token', async () => {
  const calls = [];
  const result = await refreshGmailAccessToken({
    clientId: 'client-id',
    clientSecret: 'client-secret',
    refreshToken: 'refresh-token',
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      return new Response(JSON.stringify({ access_token: 'access-token', expires_in: 3600 }), { status: 200 });
    },
  });

  assert.equal(result.accessToken, 'access-token');
  assert.equal(result.expiresIn, 3600);
  assert.equal(calls[0].url, 'https://oauth2.googleapis.com/token');
  assert.match(String(calls[0].options.body), /refresh_token=refresh-token/);
  assert.doesNotMatch(JSON.stringify(result), /refresh-token|client-secret/);
});

test('returns the provider message id when Gmail accepts a raw message', async () => {
  const result = await sendGmailRawMessage({
    accessToken: 'access-token',
    rawMessage: 'encoded-message',
    fetchImpl: async (url, options) => {
      assert.equal(url, 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send');
      assert.equal(options.headers.Authorization, 'Bearer access-token');
      const body = JSON.parse(options.body);
      assert.equal(body.raw, 'encoded-message');
      return new Response(JSON.stringify({ id: 'gmail-message-id' }), { status: 200 });
    },
  });

  assert.deepEqual(result, { id: 'gmail-message-id' });
});

test('exposes the provider status and code when Gmail rejects a message', async () => {
  await assert.rejects(
    () => sendGmailRawMessage({
      accessToken: 'access-token',
      rawMessage: 'encoded-message',
      fetchImpl: async () => new Response(JSON.stringify({ error: { code: 429, message: 'quota' } }), { status: 429 }),
    }),
    (error) => error.status === 429 && error.code === 429 && error.providerMessage === 'quota',
  );
});
