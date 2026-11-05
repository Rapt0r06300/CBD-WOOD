-- Customer self-service rights: reset/update credentials, portable export, and
-- a non-destructive account deletion request. Actual auth-user deletion stays
-- server-side and requires the owner's/manual verification workflow.

create table if not exists public.account_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  requested_at timestamptz not null default timezone('utc', now()),
  status text not null default 'requested'
    check (status in ('requested', 'approved', 'completed', 'cancelled')),
  reason text,
  completed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists account_deletion_requests_one_open_per_user
  on public.account_deletion_requests (user_id)
  where status = 'requested';

create index if not exists account_deletion_requests_owner_queue
  on public.account_deletion_requests (status, requested_at desc);

drop trigger if exists account_deletion_requests_touch_updated_at on public.account_deletion_requests;
create trigger account_deletion_requests_touch_updated_at
before update on public.account_deletion_requests
for each row execute function public.touch_updated_at();

alter table public.account_deletion_requests enable row level security;
alter table public.account_deletion_requests force row level security;

drop policy if exists account_deletion_requests_read_own on public.account_deletion_requests;
create policy account_deletion_requests_read_own
on public.account_deletion_requests for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists account_deletion_requests_insert_own on public.account_deletion_requests;
create policy account_deletion_requests_insert_own
on public.account_deletion_requests for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and status = 'requested'
);

drop policy if exists account_deletion_requests_owner_read on public.account_deletion_requests;
create policy account_deletion_requests_owner_read
on public.account_deletion_requests for select
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

revoke all on table public.account_deletion_requests from anon, authenticated;
grant select, insert on table public.account_deletion_requests to authenticated;
grant all on table public.account_deletion_requests to service_role;
