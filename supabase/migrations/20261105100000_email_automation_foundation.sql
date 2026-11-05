-- WOOD email automation foundation.
-- This migration is additive and prepares the data model without sending mail.
-- OAuth tokens, Gmail secrets and provider keys never belong in these tables.

alter table if exists public.order_notification_outbox
  add column if not exists processing_by text,
  add column if not exists processing_until timestamptz,
  add column if not exists last_attempt_at timestamptz,
  add column if not exists provider_message_id text,
  add column if not exists template_key text,
  add column if not exists template_version integer;

alter table if exists public.order_notification_outbox
  drop constraint if exists order_notification_outbox_notification_kind_check;

alter table if exists public.order_notification_outbox
  add constraint order_notification_outbox_notification_kind_check
  check (notification_kind in (
    'order_created',
    'payment_confirmed',
    'invoice_ready',
    'delivery_update',
    'order_cancelled',
    'refund_confirmed',
    'owner_order_alert'
  ));

alter table if exists public.order_notification_outbox
  drop constraint if exists order_notification_outbox_status_check;

alter table if exists public.order_notification_outbox
  add constraint order_notification_outbox_status_check
  check (status in ('pending', 'processing', 'sent', 'failed', 'dead_letter', 'cancelled'));

create table if not exists public.email_templates (
  template_key text not null,
  locale text not null default 'fr-FR',
  version integer not null default 1 check (version > 0),
  subject text not null,
  text_body text not null,
  html_body text not null,
  active boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  primary key (template_key, locale, version)
);

create unique index if not exists email_templates_active_idx
on public.email_templates(template_key, locale)
where active = true;

create table if not exists public.email_delivery_attempts (
  id bigint generated always as identity primary key,
  outbox_id bigint not null references public.order_notification_outbox(id) on delete cascade,
  provider text not null,
  attempt_number integer not null check (attempt_number > 0),
  status text not null check (status in ('accepted', 'rejected', 'deferred', 'failed')),
  provider_message_id text,
  response_code integer,
  error_code text,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists email_delivery_attempts_outbox_idx
on public.email_delivery_attempts(outbox_id, created_at desc);

create table if not exists public.invoice_documents (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  document_kind text not null check (document_kind in ('order_confirmation', 'payment_receipt', 'invoice')),
  document_number text not null,
  storage_path text not null,
  sha256 text not null check (sha256 ~ '^[a-f0-9]{64}$'),
  status text not null default 'ready' check (status in ('pending', 'ready', 'failed', 'void')),
  generated_at timestamptz,
  issued_at timestamptz,
  created_at timestamptz not null default now(),
  unique (order_id, document_kind),
  unique (document_number)
);

create index if not exists invoice_documents_order_idx
on public.invoice_documents(order_id, created_at desc);

create table if not exists public.delivery_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status text not null check (status in ('pending', 'in_progress', 'delivered', 'failed', 'cancelled')),
  note text,
  tracking_reference text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists delivery_events_order_idx
on public.delivery_events(order_id, created_at desc);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  normalized_email text not null check (normalized_email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  consent_status text not null default 'pending' check (consent_status in ('pending', 'subscribed', 'unsubscribed', 'suppressed')),
  consent_source text,
  consent_text_version text,
  consented_at timestamptz,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  suppression_reason text,
  unsubscribe_token_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (normalized_email)
);

create index if not exists newsletter_subscribers_status_idx
on public.newsletter_subscribers(consent_status, normalized_email);

create table if not exists public.newsletter_campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subject text not null,
  template_key text not null,
  template_version integer not null check (template_version > 0),
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'sending', 'paused', 'sent', 'cancelled', 'failed')),
  scheduled_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists newsletter_campaigns_status_idx
on public.newsletter_campaigns(status, scheduled_at);

create table if not exists public.newsletter_deliveries (
  id bigint generated always as identity primary key,
  campaign_id uuid not null references public.newsletter_campaigns(id) on delete cascade,
  subscriber_id uuid not null references public.newsletter_subscribers(id) on delete restrict,
  status text not null default 'pending' check (status in ('pending', 'processing', 'accepted', 'deferred', 'failed', 'suppressed', 'unsubscribed')),
  attempts integer not null default 0 check (attempts >= 0),
  provider_message_id text,
  available_at timestamptz not null default now(),
  processing_by text,
  processing_until timestamptz,
  last_error text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (campaign_id, subscriber_id)
);

create index if not exists newsletter_deliveries_pending_idx
on public.newsletter_deliveries(status, available_at, created_at);

create or replace function public.claim_order_notification_jobs(
  p_worker_id text,
  p_limit integer default 10,
  p_lease_seconds integer default 300
)
returns setof public.order_notification_outbox
language plpgsql
security definer
set search_path = public
as $$
declare
  v_limit integer := greatest(1, least(coalesce(p_limit, 10), 50));
  v_lease_seconds integer := greatest(30, least(coalesce(p_lease_seconds, 300), 3600));
begin
  if p_worker_id is null or length(trim(p_worker_id)) not between 1 and 120 then
    raise exception 'invalid worker id';
  end if;

  return query
  with candidates as (
    select id
    from public.order_notification_outbox
    where (status = 'pending' and available_at <= now())
       or (status = 'processing' and processing_until < now())
    order by available_at, id
    limit v_limit
    for update skip locked
  ), claimed as (
    update public.order_notification_outbox as outbox
    set status = 'processing',
        processing_by = trim(p_worker_id),
        processing_until = now() + make_interval(secs => v_lease_seconds),
        last_attempt_at = now(),
        attempts = outbox.attempts + 1,
        updated_at = now()
    from candidates
    where outbox.id = candidates.id
    returning outbox.*
  )
  select * from claimed order by id;
end;
$$;

revoke all on function public.claim_order_notification_jobs(text, integer, integer) from public, anon, authenticated;
grant execute on function public.claim_order_notification_jobs(text, integer, integer) to service_role;

create or replace function public.customer_owns_order(p_order_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.orders as orders
    where orders.id = p_order_id
      and orders.customer_id = (select auth.uid())
  );
$$;

revoke all on function public.customer_owns_order(uuid) from public, anon;
grant execute on function public.customer_owns_order(uuid) to authenticated, service_role;

alter table public.email_templates enable row level security;
alter table public.email_delivery_attempts enable row level security;
alter table public.invoice_documents enable row level security;
alter table public.delivery_events enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.newsletter_campaigns enable row level security;
alter table public.newsletter_deliveries enable row level security;

revoke all on table public.email_templates, public.email_delivery_attempts,
  public.invoice_documents, public.delivery_events, public.newsletter_subscribers,
  public.newsletter_campaigns, public.newsletter_deliveries
from public, anon, authenticated;

grant select on table public.email_templates, public.email_delivery_attempts,
  public.invoice_documents, public.delivery_events, public.newsletter_subscribers,
  public.newsletter_campaigns, public.newsletter_deliveries to authenticated;

grant all on table public.email_templates, public.email_delivery_attempts,
  public.invoice_documents, public.delivery_events, public.newsletter_subscribers,
  public.newsletter_campaigns, public.newsletter_deliveries to service_role;

drop policy if exists email_templates_owner_read on public.email_templates;
create policy email_templates_owner_read
on public.email_templates for select to authenticated
using (exists (select 1 from public.owner_users where owner_users.user_id = (select auth.uid())));

drop policy if exists email_delivery_attempts_owner_read on public.email_delivery_attempts;
create policy email_delivery_attempts_owner_read
on public.email_delivery_attempts for select to authenticated
using (exists (select 1 from public.owner_users where owner_users.user_id = (select auth.uid())));

drop policy if exists invoice_documents_customer_read on public.invoice_documents;
create policy invoice_documents_customer_read
on public.invoice_documents for select to authenticated
using (public.customer_owns_order(order_id));

drop policy if exists invoice_documents_owner_read on public.invoice_documents;
create policy invoice_documents_owner_read
on public.invoice_documents for select to authenticated
using (exists (select 1 from public.owner_users where owner_users.user_id = (select auth.uid())));

drop policy if exists delivery_events_customer_read on public.delivery_events;
create policy delivery_events_customer_read
on public.delivery_events for select to authenticated
using (public.customer_owns_order(order_id));

drop policy if exists delivery_events_owner_read on public.delivery_events;
create policy delivery_events_owner_read
on public.delivery_events for select to authenticated
using (exists (select 1 from public.owner_users where owner_users.user_id = (select auth.uid())));

drop policy if exists newsletter_subscribers_self_read on public.newsletter_subscribers;
create policy newsletter_subscribers_self_read
on public.newsletter_subscribers for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists newsletter_subscribers_owner_read on public.newsletter_subscribers;
create policy newsletter_subscribers_owner_read
on public.newsletter_subscribers for select to authenticated
using (exists (select 1 from public.owner_users where owner_users.user_id = (select auth.uid())));

drop policy if exists newsletter_campaigns_owner_read on public.newsletter_campaigns;
create policy newsletter_campaigns_owner_read
on public.newsletter_campaigns for select to authenticated
using (exists (select 1 from public.owner_users where owner_users.user_id = (select auth.uid())));

drop policy if exists newsletter_deliveries_owner_read on public.newsletter_deliveries;
create policy newsletter_deliveries_owner_read
on public.newsletter_deliveries for select to authenticated
using (exists (select 1 from public.owner_users where owner_users.user_id = (select auth.uid())));

insert into storage.buckets (id, name, public)
values ('order-documents', 'order-documents', false)
on conflict (id) do update set public = false;
