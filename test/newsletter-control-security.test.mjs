import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../supabase/functions/newsletter-control/index.ts', import.meta.url), 'utf8');

test('newsletter control is server-side and owner-only', () => {
  assert.match(source, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(source, /auth\.getUser\(accessToken\)/);
  assert.match(source, /owner_users/);
  assert.doesNotMatch(source, /SUPABASE_ANON_KEY/);
  assert.match(source, /newsletter_campaign_actions/);
});

test('newsletter control exposes only safe campaign actions', () => {
  for (const action of ['create_draft', 'preview', 'pause', 'resume', 'cancel']) {
    assert.match(source, new RegExp(action));
  }
  assert.doesNotMatch(source, /recipient_email.*request|request.*recipient_email/i);
});
