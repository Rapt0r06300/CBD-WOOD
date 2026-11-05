const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GMAIL_SEND_URL = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';

const readJson = async (response) => response.json().catch(() => ({}));

const providerError = (status, payload) => {
  const error = new Error(payload?.error?.message || payload?.error_description || 'Gmail provider error');
  error.status = status;
  error.code = payload?.error?.code ?? payload?.error ?? status;
  error.providerMessage = payload?.error?.message || payload?.error_description || null;
  return error;
};

export const refreshGmailAccessToken = async ({
  clientId,
  clientSecret,
  refreshToken,
  fetchImpl = fetch,
}) => {
  if (!clientId || !clientSecret || !refreshToken) throw new Error('Gmail OAuth configuration is incomplete');

  const response = await fetchImpl(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  const payload = await readJson(response);
  if (!response.ok || typeof payload.access_token !== 'string') {
    throw providerError(response.status, payload);
  }
  return {
    accessToken: payload.access_token,
    expiresIn: Number(payload.expires_in) || null,
  };
};

export const sendGmailRawMessage = async ({
  accessToken,
  rawMessage,
  fetchImpl = fetch,
}) => {
  if (!accessToken || !rawMessage) throw new Error('Gmail send configuration is incomplete');

  const response = await fetchImpl(GMAIL_SEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: rawMessage }),
  });
  const payload = await readJson(response);
  if (!response.ok || typeof payload.id !== 'string') {
    throw providerError(response.status, payload);
  }
  return { id: payload.id };
};
