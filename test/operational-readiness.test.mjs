import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

const [message, worker, workerCore, outbox, automation, documents, visualGuards, operations, runbook, staticAudit, hostingerPreflight] = await Promise.all([
  read('supabase/functions/email-worker/message.mjs'),
  read('supabase/functions/email-worker/index.ts'),
  read('supabase/functions/email-worker/worker-core.mjs'),
  read('supabase/migrations/20261104160000_order_notification_outbox.sql'),
  read('supabase/migrations/20261105100000_email_automation_foundation.sql'),
  read('supabase/migrations/20261105140000_document_generation_jobs.sql'),
  read('test/public-visual-guardrails.test.mjs'),
  read('docs/ops/email-operations.md'),
  read('docs/ops/incident-runbook.md'),
  read('scripts/static-audit.mjs'),
  read('scripts/hostinger-preflight.mjs'),
]);

test('les modèles transactionnels couvrent les événements sans annoncer un état futur', () => {
  for (const kind of [
    'order_created',
    'owner_order_alert',
    'payment_confirmed',
    'invoice_ready',
    'delivery_update',
    'delivery_issue_alert',
    'order_cancelled',
    'refund_confirmed',
  ]) assert.match(message, new RegExp(`['"]${kind}['"]`));
  assert.match(message, /payment confirmation requires a paid order/i);
  assert.match(message, /refund confirmation requires a refunded order/i);
  assert.match(message, /cancellation notice requires a cancelled order/i);
  assert.match(message, /en attente de paiement/);
});

test('la file e-mail et le worker sont idempotents, bornés et réservés au serveur', () => {
  assert.match(outbox, /unique \(order_id, notification_kind\)/);
  assert.match(outbox, /enable row level security/);
  assert.match(outbox, /revoke all on table public\.order_notification_outbox from public, anon, authenticated/);
  assert.match(automation, /for update skip locked/i);
  assert.match(worker, /x-email-worker-token/);
  assert.match(worker, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.doesNotMatch(worker, /SUPABASE_ANON_KEY/);
  assert.match(workerCore, /MAX_ATTEMPTS = 5/);
  assert.match(workerCore, /calculateRetryAt/);
  assert.match(workerCore, /dead_letter/);
  assert.match(workerCore, /safeErrorMessage/);
});

test('les documents sont privés et rattachés à une commande persistée', () => {
  assert.match(automation, /invoice_documents/);
  assert.match(automation, /unique \(order_id, document_kind\)/);
  assert.match(documents, /document_generation_jobs/);
  assert.match(documents, /for update skip locked/i);
  assert.match(documents, /processing_until < now\(\)/);
});

test('la démonstration ne promet ni SMS, ni retrait, ni QR code ni promotion', () => {
  assert.match(visualGuards, /SMS|sms|QR\\s\*code|retrait en boutique/);
  assert.match(operations, /Aucun SMS n'est activé/i);
  assert.doesNotMatch(operations, /SMS activé|SMS envoyé/i);
});

test('les environnements, secrets et incidents ont une procédure locale', () => {
  assert.match(operations, /Matrice local \/ démonstration \/ production/);
  assert.match(operations, /Rotation, révocation et restauration/);
  assert.match(operations, /refresh token\s+OAuth est révocable/i);
  assert.match(staticAudit, /Secret serveur détecté/);
  assert.match(hostingerPreflight, /forbiddenTextPattern/);
  for (const phrase of ['Commande introuvable', 'E-mail échoué', 'Stock incohérent', 'Panne Supabase ou secret compromis', 'Après incident']) {
    assert.match(runbook, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});
