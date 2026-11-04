import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const adminSource = await readFile(new URL('../admin.js', import.meta.url), 'utf8');
const adminPage = await readFile(new URL('../admin.html', import.meta.url), 'utf8');

test('owner dashboard keeps a persistent auto-refreshing Supabase session', () => {
  assert.match(adminSource, /createClient\(config\.url, config\.publishableKey, \{\s*auth:\s*\{[\s\S]*persistSession:\s*true,[\s\S]*autoRefreshToken:\s*true/);
});

test('owner order status choices are accepted by the orders check constraint', () => {
  assert.match(adminSource, /const orderStatuses = \['pending', 'paid', 'preparing', 'ready', 'completed', 'cancelled'\];/);
  assert.doesNotMatch(adminSource, /const orderStatuses = \[[^\]]*'confirmed'/);
});

test('unauthorised visitors are redirected to the normal account page', () => {
  assert.match(adminSource, /function redirectToAccount\(\)/);
  assert.match(adminSource, /window\.location\.replace\([^)]*compte\.html/);
  assert.match(adminSource, /if \(!session\?\.user\)\s*\{\s*redirectToAccount\(\);\s*return;/);
  assert.match(adminSource, /if \(!owner\)\s*\{\s*redirectToAccount\(\);\s*return;/);
  assert.match(adminSource, /if \(event === 'SIGNED_OUT'\)\s*redirectToAccount\(\);/);
});

test('admin content is hidden before JavaScript can authenticate the session', () => {
  assert.match(adminPage, /<section class="admin-login hidden" id="authView">/);
  assert.match(adminPage, /<section class="hidden" id="dashboardView">/);
});
