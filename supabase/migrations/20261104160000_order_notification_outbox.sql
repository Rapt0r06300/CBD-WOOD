-- Persistent notification outbox for reliable transactional e-mail delivery.
-- This records work to do; it does not send e-mail by itself.

create table if not exists public.order_notification_outbox (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  notification_kind text not null check (notification_kind in ('order_created', 'payment_confirmed')),
  recipient_email text not null check (recipient_email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  status text not null default 'pending' check (status in ('pending', 'processing', 'sent', 'failed')),
  attempts integer not null default 0 check (attempts >= 0),
  available_at timestamptz not null default now(),
  last_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (order_id, notification_kind)
);

create index if not exists order_notification_outbox_pending_idx
on public.order_notification_outbox(status, available_at, created_at);

alter table public.order_notification_outbox enable row level security;
revoke all on table public.order_notification_outbox from public, anon, authenticated;
grant select on table public.order_notification_outbox to authenticated;
grant all on table public.order_notification_outbox to service_role;

drop policy if exists order_notification_outbox_owner_read on public.order_notification_outbox;
create policy order_notification_outbox_owner_read
on public.order_notification_outbox for select
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

create or replace function public.enqueue_order_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' and new.customer_email is not null then
    insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
    values (new.id, 'order_created', lower(trim(new.customer_email)))
    on conflict (order_id, notification_kind) do nothing;
  elsif tg_op = 'UPDATE'
    and old.payment_status is distinct from new.payment_status
    and new.payment_status = 'paid'
    and new.customer_email is not null then
    insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
    values (new.id, 'payment_confirmed', lower(trim(new.customer_email)))
    on conflict (order_id, notification_kind) do nothing;
  end if;
  return new;
end;
$$;

revoke all on function public.enqueue_order_notifications() from public, anon, authenticated;

drop trigger if exists orders_enqueue_notifications on public.orders;
create trigger orders_enqueue_notifications
after insert or update of payment_status on public.orders
for each row execute function public.enqueue_order_notifications();

insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
select o.id, 'order_created', lower(trim(o.customer_email))
from public.orders as o
where o.customer_email is not null
  and not exists (
    select 1
    from public.order_notification_outbox as n
    where n.order_id = o.id
      and n.notification_kind = 'order_created'
  );
