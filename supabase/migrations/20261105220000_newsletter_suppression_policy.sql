-- Keep suppression and provider-event tables closed even if grants or roles change.
alter table public.newsletter_suppressions enable row level security;
alter table public.newsletter_provider_events enable row level security;

drop policy if exists newsletter_suppressions_public_deny on public.newsletter_suppressions;
create policy newsletter_suppressions_public_deny
on public.newsletter_suppressions
for all
to anon, authenticated
using (false)
with check (false);

drop policy if exists newsletter_provider_events_public_deny on public.newsletter_provider_events;
create policy newsletter_provider_events_public_deny
on public.newsletter_provider_events
for all
to anon, authenticated
using (false)
with check (false);
