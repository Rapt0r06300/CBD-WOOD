-- Add the safe audience simulation action without enabling any send.
alter table public.newsletter_campaign_actions
  drop constraint if exists newsletter_campaign_actions_action_check;

alter table public.newsletter_campaign_actions
  add constraint newsletter_campaign_actions_action_check
  check (action in ('create_draft', 'preview', 'simulate', 'start', 'pause', 'resume', 'cancel'));
