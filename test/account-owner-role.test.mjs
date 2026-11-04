import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const accountPage = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
const accountSource = await readFile(new URL('../account.js', import.meta.url), 'utf8');
const boutiqueCss = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
const roleMigration = await readFile(new URL('../supabase/migrations/20261104130000_customer_account_roles.sql', import.meta.url), 'utf8').catch(() => '');

test('account dashboard reserves a hidden owner-only management link', () => {
  assert.match(accountPage, /class="[^"]*account-owner-link[^\"]*hidden[^\"]*"[^>]*id="ownerDashboardLink"/);
  assert.match(accountPage, /href="admin\.html"/);
  assert.match(accountPage, /id="ownerDashboardLink"[^>]*aria-hidden="true"[^>]*tabindex="-1"/);
});

test('owner access is determined by the owner_users record, never a hardcoded email', () => {
  assert.match(accountSource, /from\(['"]owner_users['"]\)/);
  assert.match(accountSource, /ownerDashboardLink/);
  assert.doesNotMatch(accountSource, /bermond\.florent06@gmail\.com/i);
});

test('customer account keeps its Supabase session between pages', () => {
  assert.match(accountSource, /createClient\(config\.url, config\.publishableKey, \{\s*auth:\s*\{[\s\S]*persistSession:\s*true,[\s\S]*autoRefreshToken:\s*true/);
});

test('new accounts receive an explicit customer role in the database', () => {
  assert.match(roleMigration, /account_role\s+text\s+not null\s+default\s+'customer'/i);
  assert.match(roleMigration, /check\s*\(account_role\s*=\s*'customer'\)/i);
  assert.match(roleMigration, /create\s+or\s+replace\s+function\s+public\.handle_new_user/i);
  assert.match(roleMigration, /create\s+trigger\s+on_auth_user_created/i);
});

test('the customer role never grants owner access', () => {
  assert.match(accountSource, /function setOwnerDashboardVisibility\(isOwner\)/);
  assert.match(accountSource, /ownerDashboardLink\.tabIndex = isOwner \? 0 : -1/);
  assert.doesNotMatch(accountSource, /account_role\s*===\s*['"]owner['"]/i);
});

test('hidden account controls stay hidden despite component display rules', () => {
  assert.match(boutiqueCss, /\.hidden\{display:none!important\}/);
});
