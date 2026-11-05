import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(new URL('../supabase/migrations/20261105180000_newsletter_safety_gates.sql', import.meta.url), 'utf8');
const control = await readFile(new URL('../supabase/functions/newsletter-control/index.ts', import.meta.url), 'utf8');

test('newsletter safety gates isolate test subscribers and live campaign duplicates', () => {
  assert.match(migration, /add column if not exists is_test boolean not null default false/i);
  assert.match(migration, /newsletter_campaigns_active_template_idx/);
  assert.match(migration, /where status in \('scheduled', 'sending'\)/i);
  assert.match(migration, /subscriber\.is_test = false/g);
  assert.match(control, /eq\("is_test", false\)/);
  assert.match(control, /subscriber:newsletter_subscribers!inner\(is_test\)/);
  assert.match(control, /Une campagne active utilise déjà cette version/);
});
