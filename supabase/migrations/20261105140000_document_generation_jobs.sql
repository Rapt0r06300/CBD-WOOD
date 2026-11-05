-- Durable, server-only queue for order PDFs.
-- It keeps document generation independent from the browser and from Gmail.

create table if not exists public.document_generation_jobs (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  document_kind text not null check (document_kind in ('order_confirmation', 'payment_receipt', 'invoice')),
  status text not null default 'pending' check (status in ('pending', 'processing', 'ready', 'failed', 'dead_letter')),
  attempts integer not null default 0 check (attempts >= 0),
  available_at timestamptz not null default now(),
  processing_by text,
  processing_until timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (order_id, document_kind)
);

create index if not exists document_generation_jobs_pending_idx
on public.document_generation_jobs(status, available_at, created_at);

create index if not exists document_generation_jobs_order_idx
on public.document_generation_jobs(order_id, document_kind);

alter table public.document_generation_jobs enable row level security;
revoke all on public.document_generation_jobs from public, anon, authenticated;

create or replace function public.claim_document_generation_jobs(
  p_worker_id text,
  p_limit integer default 10,
  p_lease_seconds integer default 300
)
returns setof public.document_generation_jobs
language plpgsql
security definer
set search_path = public
as $$
declare
  v_limit integer := greatest(1, least(coalesce(p_limit, 10), 25));
  v_lease_seconds integer := greatest(30, least(coalesce(p_lease_seconds, 300), 3600));
begin
  if p_worker_id is null or length(trim(p_worker_id)) not between 1 and 120 then
    raise exception 'invalid worker id';
  end if;

  return query
  with candidates as (
    select id
    from public.document_generation_jobs
    where (status = 'pending' and available_at <= now())
       or (status = 'processing' and processing_until < now())
    order by available_at, id
    limit v_limit
    for update skip locked
  ), claimed as (
    update public.document_generation_jobs as jobs
    set status = 'processing',
        processing_by = trim(p_worker_id),
        processing_until = now() + make_interval(secs => v_lease_seconds),
        attempts = jobs.attempts + 1,
        updated_at = now()
    from candidates
    where jobs.id = candidates.id
    returning jobs.*
  )
  select * from claimed order by id;
end;
$$;

revoke all on function public.claim_document_generation_jobs(text, integer, integer) from public, anon, authenticated;
grant execute on function public.claim_document_generation_jobs(text, integer, integer) to service_role;

-- Add the PDF jobs to the same trusted order trigger. The unique key makes
-- retries and repeated status updates harmless.
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

    insert into public.document_generation_jobs (order_id, document_kind)
    values (new.id, 'order_confirmation')
    on conflict (order_id, document_kind) do nothing;

    insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
    select new.id, 'owner_order_alert', lower(trim(users.email))
    from auth.users as users
    join public.owner_users as owners on owners.user_id = users.id
    where users.email is not null
    order by owners.created_at asc
    limit 1
    on conflict (order_id, notification_kind) do nothing;
  elsif tg_op = 'UPDATE' and old.payment_status is distinct from new.payment_status then
    if new.payment_status = 'paid' and new.customer_email is not null then
      insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
      values (new.id, 'payment_confirmed', lower(trim(new.customer_email)))
      on conflict (order_id, notification_kind) do nothing;

      insert into public.document_generation_jobs (order_id, document_kind)
      values (new.id, 'payment_receipt')
      on conflict (order_id, document_kind) do nothing;
    elsif new.payment_status = 'refunded' and new.customer_email is not null then
      insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
      values (new.id, 'refund_confirmed', lower(trim(new.customer_email)))
      on conflict (order_id, notification_kind) do nothing;
    end if;
  elsif tg_op = 'UPDATE'
    and old.status is distinct from new.status
    and new.status = 'cancelled'
    and new.customer_email is not null then
    insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
    values (new.id, 'order_cancelled', lower(trim(new.customer_email)))
    on conflict (order_id, notification_kind) do nothing;
  end if;
  return new;
end;
$$;

revoke all on function public.enqueue_order_notifications() from public, anon, authenticated;

drop trigger if exists orders_enqueue_notifications on public.orders;
create trigger orders_enqueue_notifications
after insert or update of payment_status, status on public.orders
for each row execute function public.enqueue_order_notifications();
