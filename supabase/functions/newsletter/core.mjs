const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/u;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/u;
const SIGNED_TOKEN_PATTERN = /^[A-Za-z0-9_-]{36,80}\.[0-9]{10,13}\.[A-Za-z0-9_-]{43}$/u;

export const normalizeNewsletterEmail = (value) => {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  return EMAIL_PATTERN.test(email) ? email : null;
};

export const validateSubscription = (input) => {
  const email = normalizeNewsletterEmail(input?.email);
  if (!email || input?.consent !== true) return { ok: false, error: 'Consentement newsletter requis.' };
  const source = typeof input.source === 'string' ? input.source.trim().slice(0, 80) : 'site';
  const consentTextVersion = typeof input.consent_text_version === 'string'
    ? input.consent_text_version.trim().slice(0, 40)
    : '';
  if (!source || !consentTextVersion) return { ok: false, error: 'Version du consentement manquante.' };
  return { ok: true, value: { email, source, consentTextVersion } };
};

export const createUnsubscribeToken = () => {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/u, '');
};

export const validateUnsubscribeToken = (token) => typeof token === 'string' && TOKEN_PATTERN.test(token);

const base64Url = (bytes) => {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/u, '');
};

const utf8 = (value) => new TextEncoder().encode(value);

const hmac = async (value, secret) => {
  if (typeof secret !== 'string' || secret.length < 32) throw new Error('Newsletter secret is invalid');
  const key = await crypto.subtle.importKey('raw', utf8(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return base64Url(new Uint8Array(await crypto.subtle.sign('HMAC', key, utf8(value))));
};

export const createSignedUnsubscribeToken = async ({ subscriberId, secret, expiresAt = Date.now() + 365 * 24 * 60 * 60 * 1000 }) => {
  if (!/^[0-9a-f-]{36}$/iu.test(String(subscriberId))) throw new Error('Subscriber id is invalid');
  const payload = `${subscriberId}.${Math.floor(Number(expiresAt))}`;
  return `${payload}.${await hmac(payload, secret)}`;
};

export const parseSignedUnsubscribeToken = async ({ token, secret, now = Date.now() }) => {
  if (typeof token !== 'string' || !SIGNED_TOKEN_PATTERN.test(token)) return null;
  const parts = token.split('.');
  const [subscriberId, expiresAt, signature] = parts;
  const payload = `${subscriberId}.${expiresAt}`;
  const expected = await hmac(payload, secret);
  if (signature.length !== expected.length) return null;
  let mismatch = 0;
  for (let index = 0; index < signature.length; index += 1) mismatch |= signature.charCodeAt(index) ^ expected.charCodeAt(index);
  if (mismatch !== 0 || Number(expiresAt) <= now) return null;
  return { subscriberId, expiresAt: Number(expiresAt) };
};

export const hashToken = async (token) => {
  if (!validateUnsubscribeToken(token) && !(typeof token === 'string' && SIGNED_TOKEN_PATTERN.test(token))) {
    throw new Error('Invalid unsubscribe token');
  }
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
};
