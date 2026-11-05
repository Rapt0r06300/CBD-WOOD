-- Keep the customer ownership helper out of the exposed public API schema.
-- It is used by RLS policies, not by browser RPC calls.
create schema if not exists private;

create or replace function private.customer_owns_order(p_order_id uuid)
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

revoke all on function private.customer_owns_order(uuid) from public, anon, authenticated;
grant usage on schema private to authenticated, service_role;
grant execute on function private.customer_owns_order(uuid) to authenticated, service_role;

drop policy if exists invoice_documents_customer_read on public.invoice_documents;
drop policy if exists invoice_documents_owner_read on public.invoice_documents;
create policy invoice_documents_read
on public.invoice_documents for select to authenticated
using (
  private.customer_owns_order(order_id)
  or exists (select 1 from public.owner_users where owner_users.user_id = (select auth.uid()))
);

drop policy if exists delivery_events_customer_read on public.delivery_events;
drop policy if exists delivery_events_owner_read on public.delivery_events;
create policy delivery_events_read
on public.delivery_events for select to authenticated
using (
  private.customer_owns_order(order_id)
  or exists (select 1 from public.owner_users where owner_users.user_id = (select auth.uid()))
);

drop policy if exists newsletter_subscribers_self_read on public.newsletter_subscribers;
drop policy if exists newsletter_subscribers_owner_read on public.newsletter_subscribers;
create policy newsletter_subscribers_read
on public.newsletter_subscribers for select to authenticated
using (
  user_id = (select auth.uid())
  or exists (select 1 from public.owner_users where owner_users.user_id = (select auth.uid()))
);

create index if not exists delivery_events_created_by_idx
on public.delivery_events(created_by);

create index if not exists email_templates_created_by_idx
on public.email_templates(created_by);

create index if not exists newsletter_campaigns_created_by_idx
on public.newsletter_campaigns(created_by);

create index if not exists newsletter_deliveries_subscriber_idx
on public.newsletter_deliveries(subscriber_id);

create index if not exists newsletter_subscribers_user_idx
on public.newsletter_subscribers(user_id);

drop function if exists public.customer_owns_order(uuid);
