const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/u;
const MAX_RETRY_DELAY_SECONDS = 60 * 60;

export const normalizeEmail = (value) => {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().toLowerCase();
  return EMAIL_PATTERN.test(normalized) ? normalized : null;
};

export const calculateRetryAt = (attempt, now = new Date()) => {
  const safeAttempt = Math.max(1, Number.isFinite(Number(attempt)) ? Number(attempt) : 1);
  const delaySeconds = Math.min(
    MAX_RETRY_DELAY_SECONDS,
    30 * ((2 ** Math.min(safeAttempt, 8)) - 1),
  );
  return new Date(now.getTime() + delaySeconds * 1000);
};

export const isRetryableError = (error) => {
  const status = Number(error?.status ?? error?.statusCode ?? 0);
  if ([408, 425, 429].includes(status) || (status >= 500 && status <= 599)) return true;
  return ['network_error', 'timeout', 'temporarily_unavailable'].includes(error?.code);
};

const encodeHeader = (value) => {
  if (/^[\x20-\x7E]*$/u.test(value)) return value;
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return `=?UTF-8?B?${toBase64(new Uint8Array([...binary].map((character) => character.charCodeAt(0))))}?=`;
};

const toBase64 = (bytes) => {
  let binary = '';
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
};

const wrapBase64 = (value) => value.match(/.{1,76}/g)?.join('\r\n') || '';

const createBoundary = () => `wood-${crypto.randomUUID()}`;

export const buildMimeMessage = ({ from, to, subject, text, html, attachment }) => {
  const normalizedTo = normalizeEmail(to);
  if (!normalizedTo) throw new Error('Invalid recipient email');
  if (!from || !subject || !text) throw new Error('Incomplete email message');

  const boundary = createBoundary();
  const parts = [
    `From: ${from}`,
    `To: ${normalizedTo}`,
    `Subject: ${encodeHeader(subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: multipart/alternative; boundary="wood-alternative"',
    '',
    '--wood-alternative',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    text,
    '',
    '--wood-alternative',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    html || text,
    '',
    '--wood-alternative--',
  ];

  if (attachment) {
    if (!attachment.filename || !attachment.contentType || !(attachment.content instanceof Uint8Array)) {
      throw new Error('Invalid email attachment');
    }
    parts.push(
      '',
      `--${boundary}`,
      `Content-Type: ${attachment.contentType}; name="${attachment.filename}"`,
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${attachment.filename}"`,
      '',
      wrapBase64(toBase64(attachment.content)),
    );
  }

  parts.push('', `--${boundary}--`, '');
  return parts.join('\r\n');
};

export const encodeGmailRawMessage = (mimeMessage) => {
  const bytes = new TextEncoder().encode(mimeMessage);
  return toBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/u, '');
};
