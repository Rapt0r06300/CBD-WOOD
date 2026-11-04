-- Append-only order status history for owner auditing and recovery.
-- This is additive: existing orders remain untouched and receive one initial snapshot.

create table if not exists public.order_status_history (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  event_kind text not null check (event_kind in ('created', 'status_changed', 'payment_status_changed')),
  status text not null,
  payment_status text not null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists order_status_history_order_created_idx
on public.order_status_history(order_id, created_at desc);

alter table public.order_status_history enable row level security;
revoke all on table public.order_status_history from public, anon, authenticated;
grant select on table public.order_status_history to authenticated;
grant insert on table public.order_status_history to service_role;

drop policy if exists order_status_history_owner_read on public.order_status_history;
create policy order_status_history_owner_read
on public.order_status_history for select
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

create or replace function public.record_order_status_history()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event_kind text;
begin
  if tg_op = 'INSERT' then
    v_event_kind := 'created';
  elsif old.status is distinct from new.status then
    v_event_kind := 'status_changed';
  elsif old.payment_status is distinct from new.payment_status then
    v_event_kind := 'payment_status_changed';
  else
    return new;
  end if;

  insert into public.order_status_history (order_id, event_kind, status, payment_status)
  values (new.id, v_event_kind, new.status, new.payment_status);
  return new;
end;
$$;

revoke all on function public.record_order_status_history() from public, anon, authenticated;

drop trigger if exists orders_record_status_history on public.orders;
create trigger orders_record_status_history
after insert or update of status, payment_status on public.orders
for each row execute function public.record_order_status_history();

insert into public.order_status_history (order_id, event_kind, status, payment_status, created_at)
select o.id, 'created', o.status, o.payment_status, o.created_at
from public.orders as o
where not exists (
  select 1 from public.order_status_history as h where h.order_id = o.id
);

