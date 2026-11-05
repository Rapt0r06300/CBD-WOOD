import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const operations = await readFile(new URL('../docs/ops/email-operations.md', import.meta.url), 'utf8');
const changeLog = await readFile(new URL('../docs/ops/config-change-log.md', import.meta.url), 'utf8');
const example = await readFile(new URL('../.env.example', import.meta.url), 'utf8');

test('email operations document separates transaction, marketing and payment states', () => {
  for (const phrase of [
    'order_created',
    'payment_confirmed',
    'newsletter',
    'Sources de vérité',
    'Matrice local / démonstration / production',
    'Menaces et réactions attendues',
    'Gmail révoqué',
    'PDF manquant',
  ]) {
    assert.match(operations, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('email configuration example contains names but no usable secret', () => {
  assert.match(example, /SUPABASE_FUNCTIONS_URL/);
  assert.match(example, /GMAIL_CLIENT_SECRET/);
  assert.doesNotMatch(example, /GOCSPX-|ya29\.|refresh_token\s*=/i);
  assert.match(example, /example\.invalid/);
});

test('configuration change log is safe to hand over', () => {
  assert.match(changeLog, /Date UTC/);
  assert.match(changeLog, /État abstrait avant/);
  assert.match(changeLog, /jamais\s+contenir de secret/i);
  assert.doesNotMatch(changeLog, /GOCSPX-|ya29\.|SUPABASE_SERVICE_ROLE_KEY\s*=/i);
});
