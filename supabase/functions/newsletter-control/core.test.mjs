import assert from 'node:assert/strict';
import test from 'node:test';

import { campaignTransition, normalizeCampaignDraft, renderPlainTextHtml } from './core.mjs';

test('newsletter draft normalizes safe owner input and keeps text content', () => {
  const draft = normalizeCampaignDraft({
    name: '  Sélection WOOD  ',
    subject: '  Nouvelles fleurs  ',
    text_body: 'Bonjour WOOD\n\nUne sélection à découvrir.',
  });

  assert.deepEqual(draft, {
    name: 'Sélection WOOD',
    subject: 'Nouvelles fleurs',
    textBody: 'Bonjour WOOD\n\nUne sélection à découvrir.',
    templateKey: 'wood-newsletter',
  });
});

test('newsletter draft rejects empty or oversized content', () => {
  assert.throws(() => normalizeCampaignDraft({ name: '', subject: 'Sujet', text_body: 'Texte' }), /nom/i);
  assert.throws(() => normalizeCampaignDraft({ name: 'Nom', subject: 'Sujet', text_body: '' }), /contenu/i);
  assert.throws(() => normalizeCampaignDraft({ name: 'Nom', subject: 'Sujet', text_body: 'x'.repeat(10001) }), /long/i);
});

test('campaign controls allow safe pause, resume and cancellation only', () => {
  assert.deepEqual(campaignTransition('sending', 'pause'), { ok: true, next: 'paused' });
  assert.deepEqual(campaignTransition('paused', 'resume'), { ok: true, next: 'sending' });
  assert.deepEqual(campaignTransition('draft', 'cancel'), { ok: true, next: 'cancelled' });
  assert.equal(campaignTransition('sent', 'pause').ok, false);
  assert.equal(campaignTransition('cancelled', 'resume').ok, false);
});

test('plain newsletter content is escaped before HTML preview', () => {
  const html = renderPlainTextHtml('WOOD <sélection>\nà découvrir\n\n🌿 bientôt');
  assert.match(html, /&lt;sélection&gt;/);
  assert.match(html, /🌿 bientôt/);
  assert.match(html, /<br>/);
  assert.doesNotMatch(html, /<sélection>/);
});
