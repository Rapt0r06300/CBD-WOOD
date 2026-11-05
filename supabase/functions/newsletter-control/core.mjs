const MAX_NAME = 120;
const MAX_SUBJECT = 180;
const MAX_BODY = 10000;

const asText = (value) => typeof value === 'string' ? value.trim() : '';

export const normalizeCampaignDraft = (input = {}) => {
  const name = asText(input.name);
  const subject = asText(input.subject);
  const textBody = typeof input.text_body === 'string' ? input.text_body.trim() : '';
  const scheduledAt = asText(input.scheduled_at);
  if (!name) throw new Error('Le nom de campagne est requis.');
  if (!subject) throw new Error('Le sujet est requis.');
  if (!textBody) throw new Error('Le contenu est requis.');
  if (name.length > MAX_NAME || subject.length > MAX_SUBJECT || textBody.length > MAX_BODY) {
    throw new Error('Le contenu de la campagne est trop long.');
  }
  if (scheduledAt) {
    const timestamp = Date.parse(scheduledAt);
    if (!Number.isFinite(timestamp) || timestamp <= Date.now()) throw new Error('La date de planification doit être future.');
  }
  return { name, subject, textBody, scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : null, templateKey: 'wood-newsletter' };
};

export const campaignTransition = (current, action) => {
  const transitions = {
    start: { draft: 'sending', paused: 'sending' },
    pause: { sending: 'paused', scheduled: 'paused' },
    resume: { paused: 'sending' },
    cancel: { draft: 'cancelled', scheduled: 'cancelled', paused: 'cancelled' },
  };
  const next = transitions[action]?.[current];
  return next ? { ok: true, next } : { ok: false, error: 'Transition de campagne interdite.' };
};

const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character]));

export const renderPlainTextHtml = (text) => `<div role="article" style="box-sizing:border-box;width:100%;max-width:640px;margin:0 auto;padding:24px 16px;overflow-wrap:anywhere;word-break:break-word;font-family:Arial,sans-serif;font-size:16px;line-height:1.6;color:#18291d;background:#f1f0e6">${escapeHtml(text).split(/\n{2,}/u).map((paragraph) => `<p style="margin:0 0 16px">${paragraph.replaceAll('\n', '<br>')}</p>`).join('')}</div>`;
