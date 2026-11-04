import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const accountPage = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
const accountSource = await readFile(new URL('../account.js', import.meta.url), 'utf8');
const boutiqueCss = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
const roleMigration = await readFile(new URL('../supabase/migrations/20261104130000_customer_account_roles.sql', import.meta.url), 'utf8').catch(() => '');

test('account dashboard reserves a hidden owner-only management control without a public admin route', () => {
  assert.match(accountPage, /class="[^"]*account-owner-link[^\"]*hidden[^\"]*"[^>]*id="ownerDashboardLink"/);
  assert.doesNotMatch(accountPage, /href="admin\.html"/);
  assert.match(accountPage, /type="button"/);
  assert.match(accountPage, /id="ownerDashboardLink"[^>]*aria-hidden="true"[^>]*tabindex="-1"/);
});

test('owner dashboard is present inside the account and hidden before role confirmation', () => {
  assert.match(accountPage, /class="[^"]*owner-dashboard[^\"]*hidden[^"]*"[^>]*id="ownerDashboard"/);
  assert.match(accountPage, /id="ownerDashboard"[\s\S]*id="ownerProductsBody"/);
  assert.match(accountPage, /id="ownerDashboard"[\s\S]*id="ownerOrdersBody"/);
  assert.match(accountPage, /id="ownerDashboard"[\s\S]*id="owner-settings-title"/);
  assert.match(accountPage, /frais et délais à confirmer/);
  assert.match(accountPage, /Promotions<\/strong><span>Désactivées pour le moment/);
  assert.match(accountSource, /owner-dashboard\.js/);
});

test('owner access is determined by the owner_users record, never a hardcoded email', () => {
  assert.match(accountSource, /from\(['"]owner_users['"]\)/);
  assert.match(accountSource, /ownerDashboardLink/);
  assert.match(accountSource, /ownerDashboard/);
  assert.match(accountSource, /mountOwnerDashboard/);
  assert.match(accountSource, /async function getValidatedUser\(\)/);
  assert.match(accountSource, /supabase\.auth\.getUser\(\)/);
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
