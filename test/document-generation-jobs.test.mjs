import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(new URL('../supabase/migrations/20261105140000_document_generation_jobs.sql', import.meta.url), 'utf8');
const worker = await readFile(new URL('../supabase/functions/document-worker/index.ts', import.meta.url), 'utf8');

test('la file PDF est idempotente, privée et récupérable après expiration du bail', () => {
  assert.match(migration, /create table if not exists public\.document_generation_jobs/);
  assert.match(migration, /unique \(order_id, document_kind\)/);
  assert.match(migration, /for update skip locked/i);
  assert.match(migration, /processing_until < now\(\)/);
  assert.match(migration, /grant execute on function public\.claim_document_generation_jobs[\s\S]*to service_role/i);
  assert.match(migration, /enable row level security/);
});

test('la commande crée une confirmation et le paiement crée un reçu sans doublon', () => {
  assert.match(migration, /document_kind\)\s*values \(new\.id, 'order_confirmation'\)/);
  assert.match(migration, /document_kind\)\s*values \(new\.id, 'payment_receipt'\)/);
  assert.match(migration, /on conflict \(order_id, document_kind\) do nothing/);
});

test('le worker PDF reste côté serveur et sait traiter une file', () => {
  assert.match(worker, /DOCUMENT_WORKER_TOKEN/);
  assert.match(worker, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(worker, /claim_document_generation_jobs/);
  assert.match(worker, /document_generation_jobs/);
  assert.doesNotMatch(worker, /SUPABASE_ANON_KEY/);
});
