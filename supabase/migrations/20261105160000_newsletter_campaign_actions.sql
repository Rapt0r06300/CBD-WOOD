-- Owner-only audit trail for newsletter controls.
-- Campaign content and delivery data remain separate from this control log.

create table if not exists public.newsletter_campaign_actions (
  id bigint generated always as identity primary key,
  campaign_id uuid not null references public.newsletter_campaigns(id) on delete cascade,
  actor_id uuid not null references auth.users(id) on delete restrict,
  action text not null check (action in ('create_draft', 'preview', 'simulate', 'start', 'pause', 'resume', 'cancel')),
  from_status text,
  to_status text,
  created_at timestamptz not null default now()
);

create index if not exists newsletter_campaign_actions_campaign_idx
on public.newsletter_campaign_actions(campaign_id, created_at desc);

alter table public.newsletter_campaign_actions enable row level security;
revoke all on table public.newsletter_campaign_actions from public, anon, authenticated;
grant all on table public.newsletter_campaign_actions to service_role;
