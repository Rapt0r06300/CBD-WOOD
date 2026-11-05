-- Make the owner-only action log explicit for the security advisor and audits.
-- Service-role workers retain full access; normal clients remain denied except
-- for authenticated owners reading their own operational log.

create index if not exists newsletter_campaign_actions_actor_idx
on public.newsletter_campaign_actions(actor_id, created_at desc);

drop policy if exists newsletter_campaign_actions_owner_read on public.newsletter_campaign_actions;
create policy newsletter_campaign_actions_owner_read
on public.newsletter_campaign_actions for select to authenticated
using (exists (
  select 1
  from public.owner_users
  where owner_users.user_id = (select auth.uid())
));
