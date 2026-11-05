import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../supabase/functions/document-worker/index.ts', import.meta.url), 'utf8');

test('document worker is server-only and stores PDFs privately', () => {
  assert.match(source, /DOCUMENT_WORKER_TOKEN/);
  assert.match(source, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(source, /order-documents/);
  assert.match(source, /application\/pdf/);
  assert.match(source, /invoice_documents/);
  assert.doesNotMatch(source, /SUPABASE_ANON_KEY/);
});

test('document worker does not generate a paid receipt without paid status', () => {
  assert.match(source, /payment_receipt/);
  assert.match(source, /buildDocumentModel/);
  assert.match(source, /Payment receipt requires paid order/);
});
