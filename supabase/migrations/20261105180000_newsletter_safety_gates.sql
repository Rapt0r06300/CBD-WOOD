-- Safety gates for newsletter campaigns.
-- Test subscribers are never included in commercial campaigns or metrics.

alter table public.newsletter_subscribers
  add column if not exists is_test boolean not null default false;

create index if not exists newsletter_subscribers_test_status_idx
on public.newsletter_subscribers(is_test, consent_status, normalized_email);

-- Only one live campaign may use a given template version at a time.
create unique index if not exists newsletter_campaigns_active_template_idx
on public.newsletter_campaigns(template_key, template_version)
where status in ('scheduled', 'sending');

create or replace function public.populate_newsletter_campaign(p_campaign_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_inserted integer;
begin
  if not exists (
    select 1 from public.newsletter_campaigns
    where id = p_campaign_id and status in ('draft', 'scheduled', 'sending')
  ) then
    raise exception 'campaign is not eligible';
  end if;

  insert into public.newsletter_deliveries (campaign_id, subscriber_id)
  select p_campaign_id, subscriber.id
  from public.newsletter_subscribers as subscriber
  where subscriber.consent_status = 'subscribed'
    and subscriber.is_test = false
  on conflict (campaign_id, subscriber_id) do nothing;
  get diagnostics v_inserted = row_count;
  return v_inserted;
end;
$$;

revoke all on function public.populate_newsletter_campaign(uuid) from public, anon, authenticated;
grant execute on function public.populate_newsletter_campaign(uuid) to service_role;

create or replace function public.claim_newsletter_deliveries(
  p_worker_id text,
  p_limit integer default 10,
  p_lease_seconds integer default 300
)
returns setof public.newsletter_deliveries
language plpgsql
security definer
set search_path = public
as $$
declare
  v_limit integer := greatest(1, least(coalesce(p_limit, 10), 100));
  v_lease_seconds integer := greatest(30, least(coalesce(p_lease_seconds, 300), 3600));
begin
  if p_worker_id is null or length(trim(p_worker_id)) not between 1 and 120 then
    raise exception 'invalid worker id';
  end if;

  return query
  with candidates as (
    select delivery.id
    from public.newsletter_deliveries as delivery
    join public.newsletter_campaigns as campaign on campaign.id = delivery.campaign_id
    join public.newsletter_subscribers as subscriber on subscriber.id = delivery.subscriber_id
    where campaign.status = 'sending'
      and subscriber.consent_status = 'subscribed'
      and subscriber.is_test = false
      and ((delivery.status in ('pending', 'deferred') and delivery.available_at <= now())
        or (delivery.status = 'processing' and delivery.processing_until < now()))
    order by delivery.available_at, delivery.id
    limit v_limit
    for update of delivery skip locked
  ), claimed as (
    update public.newsletter_deliveries as delivery
    set status = 'processing',
        processing_by = trim(p_worker_id),
        processing_until = now() + make_interval(secs => v_lease_seconds),
        attempts = delivery.attempts + 1,
        updated_at = now()
    from candidates
    where delivery.id = candidates.id
    returning delivery.*
  )
  select * from claimed order by id;
end;
$$;

revoke all on function public.claim_newsletter_deliveries(text, integer, integer) from public, anon, authenticated;
grant execute on function public.claim_newsletter_deliveries(text, integer, integer) to service_role;
