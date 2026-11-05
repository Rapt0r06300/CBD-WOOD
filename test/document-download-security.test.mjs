import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../supabase/functions/document-download/index.ts', import.meta.url), 'utf8');

test('document download stays private and requires an authenticated user', () => {
  assert.match(source, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(source, /Authorization/);
  assert.match(source, /auth\.getUser\(accessToken\)/);
  assert.match(source, /owner_users/);
  assert.match(source, /customer_id/);
  assert.match(source, /createSignedUrl/);
  assert.match(source, /order-documents/);
  assert.doesNotMatch(source, /public: true|makePublic|download\(document\.storage_path\)/i);
});

test('document download rejects arbitrary document ids before database access', () => {
  assert.match(source, /!\/\^\[0-9a-f-\]\{36\}\$\/i/);
});
