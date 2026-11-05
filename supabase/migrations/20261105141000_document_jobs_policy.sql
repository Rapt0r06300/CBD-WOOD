-- Keep the server-only queue explicit for the Supabase security advisor.
-- Service role is still the only role allowed to use the claim function.

drop policy if exists document_generation_jobs_no_client_access on public.document_generation_jobs;
create policy document_generation_jobs_no_client_access
on public.document_generation_jobs
for all
to anon, authenticated
using (false)
with check (false);
