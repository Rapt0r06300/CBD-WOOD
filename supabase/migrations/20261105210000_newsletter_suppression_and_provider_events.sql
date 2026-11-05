-- Persistent marketing suppression and idempotent provider-event intake.
-- Transactional order mail is deliberately not affected by this table.

create table if not exists public.newsletter_suppressions (
  id uuid primary key default gen_random_uuid(),
  normalized_email text not null check (normalized_email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  reason text not null check (reason in ('permanent_bounce', 'complaint', 'manual', 'other')),
  source text not null default 'provider',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (normalized_email)
);

create index if not exists newsletter_suppressions_active_idx
on public.newsletter_suppressions(active, normalized_email);

create table if not exists public.newsletter_provider_events (
  id uuid primary key default gen_random_uuid(),
  provider_event_id text not null unique,
  event_type text not null check (event_type in ('delivered', 'permanent_bounce', 'complaint')),
  normalized_email text not null check (normalized_email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  source text not null default 'provider',
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists newsletter_provider_events_email_idx
on public.newsletter_provider_events(normalized_email, received_at desc);

create or replace function public.process_newsletter_provider_event(
  p_provider_event_id text,
  p_event_type text,
  p_email text,
  p_source text default 'provider'
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_email text := lower(trim(coalesce(p_email, '')));
  v_event_type text := lower(trim(coalesce(p_event_type, '')));
  v_inserted integer;
begin
  if p_provider_event_id is null or length(trim(p_provider_event_id)) not between 1 and 240 then
    raise exception 'invalid provider event id';
  end if;
  if v_email !~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'invalid provider event email';
  end if;
  if v_event_type not in ('delivered', 'permanent_bounce', 'complaint') then
    raise exception 'unsupported provider event';
  end if;

  insert into public.newsletter_provider_events(provider_event_id, event_type, normalized_email, source, processed_at)
  values (trim(p_provider_event_id), v_event_type, v_email, left(coalesce(nullif(trim(p_source), ''), 'provider'), 80), now())
  on conflict (provider_event_id) do nothing;
  get diagnostics v_inserted = row_count;

  if v_inserted = 0 then
    return false;
  end if;

  if v_event_type in ('permanent_bounce', 'complaint') then
    insert into public.newsletter_suppressions(normalized_email, reason, source, active, updated_at)
    values (v_email, v_event_type, left(coalesce(nullif(trim(p_source), ''), 'provider'), 80), true, now())
    on conflict (normalized_email) do update
      set reason = excluded.reason,
          source = excluded.source,
          active = true,
          updated_at = now();
    update public.newsletter_subscribers
    set consent_status = 'suppressed',
        suppression_reason = v_event_type,
        updated_at = now()
    where normalized_email = v_email;
  end if;
  return true;
end;
$$;

revoke all on function public.process_newsletter_provider_event(text, text, text, text) from public, anon, authenticated;
grant execute on function public.process_newsletter_provider_event(text, text, text, text) to service_role;

alter table public.newsletter_suppressions enable row level security;
alter table public.newsletter_provider_events enable row level security;
revoke all on table public.newsletter_suppressions from public, anon, authenticated;
revoke all on table public.newsletter_provider_events from public, anon, authenticated;
grant all on table public.newsletter_suppressions to service_role;
grant all on table public.newsletter_provider_events to service_role;
