-- Activate exactly one immutable newsletter template version when a campaign
-- is explicitly started. The test-send action is recorded separately.

alter table public.newsletter_campaign_actions
  drop constraint if exists newsletter_campaign_actions_action_check;

alter table public.newsletter_campaign_actions
  add constraint newsletter_campaign_actions_action_check
  check (action in ('create_draft', 'preview', 'simulate', 'test_send', 'start', 'pause', 'resume', 'cancel'));

create or replace function public.activate_newsletter_template(
  p_template_key text,
  p_locale text,
  p_version integer
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.email_templates
  set active = false
  where template_key = p_template_key
    and locale = p_locale
    and version <> p_version;

  update public.email_templates
  set active = true
  where template_key = p_template_key
    and locale = p_locale
    and version = p_version;

  if not found then
    raise exception 'newsletter template version not found';
  end if;
end;
$$;

revoke all on function public.activate_newsletter_template(text, text, integer) from public, anon, authenticated;
grant execute on function public.activate_newsletter_template(text, text, integer) to service_role;
