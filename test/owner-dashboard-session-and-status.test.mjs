import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const accountSource = await readFile(new URL('../account.js', import.meta.url), 'utf8');
const ownerSource = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');
const accountPage = await readFile(new URL('../compte.html', import.meta.url), 'utf8');

test('owner dashboard uses the same persistent auto-refreshing Supabase session as the account', () => {
  assert.match(accountSource, /createClient\(config\.url, config\.publishableKey, \{\s*auth:\s*\{[\s\S]*persistSession:\s*true,[\s\S]*autoRefreshToken:\s*true/);
});

test('owner order status choices stay aligned with the database constraint', () => {
  assert.match(ownerSource, /const orderStatuses = \['pending', 'paid', 'preparing', 'ready', 'completed', 'cancelled'\];/);
  assert.doesNotMatch(ownerSource, /const orderStatuses = \[[^\]]*'confirmed'/);
});

test('a normal account keeps the owner section hidden until owner_users confirms access', () => {
  assert.match(accountSource, /from\(['"]owner_users['"]\)/);
  assert.match(accountSource, /setOwnerDashboardVisibility\(isOwner\)/);
  assert.match(accountPage, /class="owner-dashboard hidden" id="ownerDashboard"/);
  assert.match(accountPage, /id="ownerDashboardLink" type="button" aria-hidden="true" tabindex="-1"/);
});

test('the old public admin page is gone', async () => {
  await assert.rejects(() => readFile(new URL('../admin.html', import.meta.url)), { code: 'ENOENT' });
});

test('owner orders expose private document downloads without exposing storage paths', () => {
  assert.match(ownerSource, /invoice_documents/);
  assert.match(ownerSource, /data-owner-document-id/);
  assert.match(ownerSource, /functions\/v1\/document-download/);
  assert.doesNotMatch(ownerSource, /storage_path/);
  assert.match(accountPage, /Documents/);
});
