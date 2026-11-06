import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('le contrat compte client WOOD sépare session, historique et espace propriétaire', async () => {
  const contract = await readFile(new URL('../docs/design/wood-customer-account-contract.md', import.meta.url), 'utf8');
  const page = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
  const account = await readFile(new URL('../account.js', import.meta.url), 'utf8');
  const roleMigration = await readFile(new URL('../supabase/migrations/20261104130000_customer_account_roles.sql', import.meta.url), 'utf8');
  const rightsMigration = await readFile(new URL('../supabase/migrations/20261105240000_customer_account_rights.sql', import.meta.url), 'utf8');
  const boutique = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
  const mobile = await readFile(new URL('../mobile.css', import.meta.url), 'utf8');

  for (const heading of [
    'Périmètre et source de vérité',
    'Création, connexion et session',
    'Historique et droits client',
    'Frontière propriétaire et sécurité',
    'Responsive, erreurs et fallback',
    'Preuve, revue et rollback',
  ]) {
    assert.match(contract, new RegExp(`## ${heading}`));
  }

  assert.match(page, /id="account-email" name="email" type="email" autocomplete="username"/);
  assert.match(page, /data-account-tab="login"/);
  assert.match(page, /data-account-tab="register"/);
  assert.match(page, /id="accountOrders"/);
  assert.match(page, /id="forgotPasswordButton"/);
  assert.match(account, /persistSession:\s*true/);
  assert.match(account, /autoRefreshToken:\s*true/);
  assert.match(account, /supabase\.auth\.signInWithPassword/);
  assert.match(account, /supabase\.auth\.signUp/);
  assert.match(account, /supabase\.auth\.getSession/);
  assert.match(account, /supabase\.auth\.onAuthStateChange/);
  assert.match(account, /from\('orders'\)\.select[\s\S]*eq\('customer_id', user\.id\)/);
  assert.match(account, /from\('owner_users'\)\.select/);
  assert.match(account, /setOwnerDashboardVisibility\(isOwner\)/);
  assert.match(account, /event === 'SIGNED_OUT'/);
  assert.match(account, /Vos informations déjà saisies sont conservées/);
  assert.match(roleMigration, /account_role\s+text\s+not null\s+default\s+'customer'/i);
  assert.match(roleMigration, /create\s+or\s+replace\s+function\s+public\.handle_new_user/i);
  assert.match(roleMigration, /check\s*\(account_role\s*=\s*'customer'\)/i);
  assert.match(rightsMigration, /enable row level security/);
  assert.match(rightsMigration, /user_id = \(select auth\.uid\(\)\)/g);
  assert.match(rightsMigration, /account_deletion_requests_one_open_per_user/);
  assert.match(page, /class="[^"\n]*owner-dashboard[^"\n]*hidden[^"\n]*" id="ownerDashboard"/);
  assert.match(page, /id="ownerDashboardLink" type="button" aria-hidden="true" tabindex="-1"/);
  assert.doesNotMatch(page, /href="admin\.html"/i);
  assert.match(boutique, /\.hidden\{display:none!important\}/);
  assert.match(mobile, /@media \(max-width: 800px\)/);
  assert.match(contract, /propriétaire|conjoint/iu);
  assert.match(contract, /navigateur|appareil/iu);
  assert.match(contract, /retour arrière|rollback/iu);
});
