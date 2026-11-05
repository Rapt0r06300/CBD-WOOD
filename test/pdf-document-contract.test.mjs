import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('le contrat PDF couvre le numéro, le rendu et la reprise sans faux paiement', async () => {
  const [worker, jobs, documents, guide] = await Promise.all([
    read('supabase/functions/document-worker/index.ts'),
    read('supabase/migrations/20261105140000_document_generation_jobs.sql'),
    read('supabase/migrations/20261105100000_email_automation_foundation.sql'),
    read('docs/ops/pdf-documents.md'),
  ]);

  assert.match(worker, /payment_receipt.*paid|paid.*payment_receipt/is);
  assert.match(worker, /-R.*-F.*-C|payment_receipt.*-R/s);
  assert.match(worker, /order-documents/);
  assert.match(jobs, /unique \(order_id, document_kind\)/i);
  assert.match(jobs, /for update skip locked/i);
  assert.match(jobs, /dead_letter/);
  assert.match(documents, /unique \(document_number\)/i);
  assert.match(documents, /sha256/);
  assert.match(guide, /police embarquée/i);
  assert.match(guide, /jamais.*paiement confirmé/is);
});
