import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

const workflow = await readFile(new URL('../.github/workflows/supabase-workers.yml', import.meta.url), 'utf8');
const documentation = await readFile(new URL('../docs/ops/supabase-workers-scheduler.md', import.meta.url), 'utf8');

test('le planificateur Supabase est inactif sans secrets et ne contient aucune valeur secrète', () => {
  assert.match(workflow, /schedule:/);
  assert.match(workflow, /configured=false/);
  assert.match(workflow, /EMAIL_WORKER_TOKEN/);
  assert.doesNotMatch(workflow, /SUPABASE_SERVICE_ROLE_KEY|GMAIL_REFRESH_TOKEN|GMAIL_CLIENT_SECRET|VIVA_(?:SECRET|API_KEY|TOKEN)/i);
  assert.doesNotMatch(workflow, /supabase\.co\/functions\/v1\/email-worker/);
});

test('le cron ne lance pas automatiquement une newsletter', () => {
  assert.match(workflow, /github\.event_name == 'workflow_dispatch'/);
  assert.match(workflow, /newsletter_campaign_id/);
  assert.match(documentation, /La newsletter n’est pas lancée par le cron/);
});

test('les workers utilisent HTTPS, POST et les headers serveur dédiés', () => {
  assert.match(workflow, /https:\/\/\*\.supabase\.co\/functions\/v1/);
  assert.match(workflow, /-X POST/);
  assert.match(workflow, /x-email-worker-token/);
  assert.match(workflow, /x-newsletter-worker-token/);
});
