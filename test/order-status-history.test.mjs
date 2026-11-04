import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const migration = await readFile(new URL('../supabase/migrations/20261104150000_order_status_history.sql', import.meta.url), 'utf8');

test('l’historique de commande est append-only, lié à la commande et protégé par RLS', () => {
  assert.match(migration, /create table if not exists public\.order_status_history/);
  assert.match(migration, /order_id uuid not null references public\.orders\(id\) on delete cascade/);
  assert.match(migration, /alter table public\.order_status_history enable row level security/);
  assert.match(migration, /revoke all on table public\.order_status_history from public, anon, authenticated/);
  assert.match(migration, /order_status_history_owner_read/);
});

test('les créations et changements d’état sont enregistrés par trigger sans exposer d’écriture publique', () => {
  assert.match(migration, /create or replace function public\.record_order_status_history/);
  assert.match(migration, /event_kind := 'created'/);
  assert.match(migration, /event_kind := 'status_changed'/);
  assert.match(migration, /event_kind := 'payment_status_changed'/);
  assert.match(migration, /create trigger orders_record_status_history/);
  assert.match(migration, /grant insert on table public\.order_status_history to service_role/);
});
