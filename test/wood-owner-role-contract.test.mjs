import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const contract = await readFile(new URL('../docs/design/wood-owner-role-contract.md', import.meta.url), 'utf8');
const account = await readFile(new URL('../account.js', import.meta.url), 'utf8');
const dashboard = await readFile(new URL('../owner-dashboard.js', import.meta.url), 'utf8');
const accountPage = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../boutique.css', import.meta.url), 'utf8');
const statusMigration = await readFile(new URL('../supabase/migrations/20261105250000_owner_order_status_rpc.sql', import.meta.url), 'utf8');
const addressMigration = await readFile(new URL('../supabase/migrations/20261105260000_owner_order_address_correction.sql', import.meta.url), 'utf8');

test('le contrat owner relie la visibilité à la source owner_users', () => {
  assert.match(contract, /Périmètre et source de vérité/iu);
  assert.match(contract, /owner_users/iu);
  assert.match(account, /from\(['"]owner_users['"]\)/);
  assert.match(account, /supabase\.auth\.getUser\(\)/);
  assert.match(accountPage, /ownerDashboardLink[\s\S]*aria-hidden="true"[\s\S]*tabindex="-1"/);
  assert.doesNotMatch(accountPage, /href="admin\.html"/);
  assert.doesNotMatch(account, /bermond\.florent06@gmail\.com/i);
});

test('le contrat couvre le dashboard, les écritures contrôlées et leur audit', () => {
  assert.match(contract, /Écritures contrôlées et audit/iu);
  assert.match(contract, /owner_update_order_status/);
  assert.match(contract, /owner_update_order_address/);
  assert.match(contract, /journalisation|audit/iu);
  assert.match(dashboard, /supabase\.rpc\('owner_update_order_status'/);
  assert.match(dashboard, /supabase\.rpc\('owner_update_order_address'/);
  assert.doesNotMatch(dashboard, /supabase\.from\(['"]orders['"]\)\.update/);
  assert.match(statusMigration, /security definer[\s\S]*set search_path = public/);
  assert.match(statusMigration, /order_status_changes/);
  assert.match(statusMigration, /owner_users/);
  assert.match(addressMigration, /order_address_changes/);
  assert.match(addressMigration, /revoke all on function public\.owner_update_order_address/);
});

test('le contrat explicite les états de repli, l accessibilité et le rollback', () => {
  assert.match(contract, /États, erreurs et fallback/iu);
  assert.match(contract, /Responsive, clavier et reduced-motion/iu);
  assert.match(contract, /Preuve, revue et rollback/iu);
  assert.match(dashboard, /Session invalide/);
  assert.match(dashboard, /Impossible de mettre à jour la commande/);
  assert.match(dashboard, /Adresse corrigée et journalisée/);
  assert.match(account, /persistSession:\s*true/);
  assert.match(accountPage, /ownerDashboard/);
  assert.match(css, /\.hidden\{display:none!important\}/);
});
