const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/u;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/u;

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

export const hashToken = async (token) => {
  if (!validateUnsubscribeToken(token)) throw new Error('Invalid unsubscribe token');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
};
