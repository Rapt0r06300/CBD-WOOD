import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const contract = await readFile(new URL('../docs/design/wood-email-document-contract.md', import.meta.url), 'utf8');
const operations = await readFile(new URL('../docs/ops/email-operations.md', import.meta.url), 'utf8');
const envExample = await readFile(new URL('../.env.example', import.meta.url), 'utf8');
const emailWorker = await readFile(new URL('../supabase/functions/email-worker/index.ts', import.meta.url), 'utf8');
const automation = await readFile(new URL('../supabase/migrations/20261105100000_email_automation_foundation.sql', import.meta.url), 'utf8');
const documentJobs = await readFile(new URL('../supabase/migrations/20261105140000_document_generation_jobs.sql', import.meta.url), 'utf8');
const documentPolicy = await readFile(new URL('../supabase/migrations/20261105141000_document_jobs_policy.sql', import.meta.url), 'utf8');
const documentGuide = await readFile(new URL('../docs/ops/pdf-documents.md', import.meta.url), 'utf8');

test('le contrat sépare transactionnel, documents, paiement et marketing', () => {
  assert.match(contract, /Périmètre et séparation/iu);
  for (const term of ['order_created', 'payment_confirmed', 'invoice_ready', 'delivery_update', 'newsletter']) {
    assert.match(contract, new RegExp(term, 'iu'));
    assert.match(operations, new RegExp(term, 'iu'));
  }
  assert.match(contract, /aucun message commercial|aucun e-mail réel/iu);
  assert.match(operations, /Une commande enregistrée n'est jamais présentée comme payée/iu);
  assert.match(operations, /Gmail révoqué/iu);
});

test('les workers et files restent server-only, idempotents et récupérables', () => {
  assert.match(contract, /Sources de vérité et file/iu);
  assert.match(contract, /server-only|côté serveur/iu);
  assert.match(emailWorker, /EMAIL_WORKER_TOKEN/);
  assert.match(emailWorker, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(emailWorker, /GMAIL_CLIENT_SECRET/);
  assert.match(emailWorker, /claim_order_notification_jobs/);
  assert.match(emailWorker, /for update skip locked|processing_until/iu);
  assert.doesNotMatch(emailWorker, /SUPABASE_ANON_KEY/);
  assert.match(automation, /create or replace function public\.claim_order_notification_jobs/iu);
  assert.match(automation, /for update skip locked/iu);
  assert.match(documentJobs, /unique \(order_id, document_kind\)/iu);
  assert.match(documentJobs, /processing_until < now\(\)/iu);
});

test('les PDF restent privés et les secrets Gmail restent hors paquet public', () => {
  assert.match(contract, /PDF privé et secrets/iu);
  assert.match(documentPolicy, /create policy document_generation_jobs_no_client_access/iu);
  assert.match(documentPolicy, /using \(false\)/iu);
  assert.match(documentJobs, /on conflict \(order_id, document_kind\) do nothing/iu);
  assert.match(documentGuide, /jamais.*paiement confirmé/isu);
  assert.match(envExample, /GMAIL_CLIENT_SECRET/);
  assert.match(envExample, /example\.invalid/);
  assert.doesNotMatch(envExample, /GOCSPX-|ya29\.|refresh_token\s*=/iu);
});

test('le contrat couvre les états, le rollback, la revue et le mode prêt à connecter', () => {
  assert.match(contract, /États, erreurs et fallback/iu);
  assert.match(contract, /Preuve, revue et rollback/iu);
  assert.match(contract, /Gmail révoqué|PDF manquant/iu);
  assert.match(contract, /test contrôlé|prêt à connecter/iu);
  assert.match(operations, /Matrice local \/ démonstration \/ production/iu);
  assert.match(operations, /Menaces et réactions attendues/iu);
  assert.match(operations, /Sans secrets\s+réels.*prêt à connecter/isu);
});
