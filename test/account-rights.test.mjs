import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const html = await readFile(new URL('../compte.html', import.meta.url), 'utf8');
const js = await readFile(new URL('../account.js', import.meta.url), 'utf8');
const migration = await readFile(new URL('../supabase/migrations/20261105240000_customer_account_rights.sql', import.meta.url), 'utf8');

test('le compte expose les droits client sans exposer de zone propriétaire aux visiteurs', () => {
  assert.match(html, /id="forgotPasswordButton"/);
  assert.match(html, /id="passwordUpdateForm"/);
  assert.match(html, /id="downloadAccountDataButton"/);
  assert.match(html, /id="requestAccountDeletionButton"/);
  assert.match(html, /autocomplete="new-password"/);
  assert.match(html, /class="[^"]*account-owner-link[^\"]*hidden[^"]*"[^>]+id="ownerDashboardLink"/);
});

test('les actions client utilisent Supabase et n’exportent jamais la session', () => {
  assert.match(js, /resetPasswordForEmail/);
  assert.match(js, /updateUser\(\{ password \}/);
  assert.match(js, /account_deletion_requests.*insert/s);
  assert.match(js, /new Blob\(\[JSON\.stringify\(payload/);
  assert.doesNotMatch(js, /access_token.*JSON\.stringify/);
  assert.doesNotMatch(js, /refresh_token.*JSON\.stringify/);
});

test('la demande de suppression est limitée à l’utilisateur authentifié et au statut demandé', () => {
  assert.match(migration, /enable row level security/);
  assert.match(migration, /force row level security/);
  assert.match(migration, /user_id = \(select auth\.uid\(\)\)/g);
  assert.match(migration, /status = 'requested'/g);
  assert.match(migration, /unique index if not exists account_deletion_requests_one_open_per_user/);
  assert.match(migration, /grant select, insert on table public\.account_deletion_requests to authenticated/);
  assert.doesNotMatch(migration, /grant .*update.*account_deletion_requests to authenticated/);
  assert.doesNotMatch(migration, /grant .*delete.*account_deletion_requests to authenticated/);
});

test('la demande est non destructive et réservée au traitement serveur ou propriétaire', () => {
  assert.match(migration, /Actual auth-user deletion stays[\s\S]*server-side/);
  assert.match(migration, /account_deletion_requests_owner_read/);
  assert.match(html, /demande vérifiée manuellement/);
});
