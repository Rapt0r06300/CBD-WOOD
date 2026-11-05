import { createSignedUnsubscribeToken } from '../newsletter/core.mjs';

export const MAX_NEWSLETTER_ATTEMPTS = 5;

export const eligibleSubscribers = (subscribers) => (Array.isArray(subscribers) ? subscribers : [])
  .filter((subscriber) => subscriber?.consent_status === 'subscribed' && subscriber?.is_test !== true && typeof subscriber.normalized_email === 'string')
  .map((subscriber) => ({ ...subscriber, normalized_email: subscriber.normalized_email.trim().toLowerCase() }))
  .filter((subscriber) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/u.test(subscriber.normalized_email));

export const calculateNewsletterRetryAt = (attempt, now = new Date()) => {
  const safeAttempt = Math.max(1, Number(attempt) || 1);
  const delaySeconds = Math.min(60 * 60, 60 * (2 ** Math.min(safeAttempt, 6)));
  return new Date(now.getTime() + delaySeconds * 1000);
};

export const buildNewsletterMessage = async ({ campaign, subscriber, textBody, htmlBody, from, unsubscribeUrl, unsubscribeSecret }) => {
  if (!campaign?.subject || !subscriber?.id || !subscriber?.normalized_email || !textBody || !htmlBody || !from || !unsubscribeUrl) {
    throw new Error('Incomplete newsletter message data');
  }
  const token = await createSignedUnsubscribeToken({ subscriberId: subscriber.id, secret: unsubscribeSecret });
  const link = `${String(unsubscribeUrl).replace(/\/$/u, '')}?token=${encodeURIComponent(token)}`;
  const footerText = `\n\nWOOD — CBD / Nice\nSe désinscrire : ${link}`;
  const footerHtml = `<footer role="contentinfo" style="box-sizing:border-box;width:100%;max-width:640px;margin:0 auto;padding:16px;color:#18291d;background:#f1f0e6;font-family:Arial,sans-serif;font-size:14px;line-height:1.5;overflow-wrap:anywhere"><hr style="border:0;border-top:1px solid #a6b5a5"><p style="margin:0">WOOD — CBD / Nice<br><a href="${link}" aria-label="Se désinscrire de la newsletter" style="color:#214d2d;text-decoration:underline;font-weight:700;display:inline-block;padding:10px 0">Se désinscrire de la newsletter</a></p></footer>`;
  return {
    from,
    to: subscriber.normalized_email,
    subject: campaign.subject,
    text: `${textBody}${footerText}`,
    html: `${htmlBody}${footerHtml}`,
  };
};

export const deliveryOutcome = ({ error = null, attempts = 1, now = new Date() }) => {
  const status = Number(error?.status ?? error?.statusCode ?? 0);
  const retryable = !error || [408, 425, 429].includes(status) || (status >= 500 && status <= 599)
    || ['network_error', 'timeout', 'temporarily_unavailable'].includes(error?.code);
  if (!error) return { status: 'accepted', availableAt: null };
  if (retryable && attempts < MAX_NEWSLETTER_ATTEMPTS) {
    return { status: 'deferred', availableAt: calculateNewsletterRetryAt(attempts, now) };
  }
  return { status: 'failed', availableAt: null };
};
