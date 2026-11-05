-- Owner-side alert for a newly persisted order.
-- This only creates durable work in the outbox. A server-side worker sends it
-- later, once Gmail is configured. No provider secret belongs in the database.

create or replace function public.enqueue_order_notifications()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' and new.customer_email is not null then
    insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
    values (new.id, 'order_created', lower(trim(new.customer_email)))
    on conflict (order_id, notification_kind) do nothing;

    -- Keep the owner alert separate from the customer confirmation. The
    -- current owner model has one active owner; LIMIT 1 also avoids duplicate
    -- alerts if an old/inactive owner row is still present.
    insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
    select new.id, 'owner_order_alert', lower(trim(users.email))
    from auth.users as users
    join public.owner_users as owners on owners.user_id = users.id
    where users.email is not null
    order by owners.created_at asc
    limit 1
    on conflict (order_id, notification_kind) do nothing;
  elsif tg_op = 'UPDATE' and old.payment_status is distinct from new.payment_status then
    if new.payment_status = 'paid' and new.customer_email is not null then
      insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
      values (new.id, 'payment_confirmed', lower(trim(new.customer_email)))
      on conflict (order_id, notification_kind) do nothing;
    elsif new.payment_status = 'refunded' and new.customer_email is not null then
      insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
      values (new.id, 'refund_confirmed', lower(trim(new.customer_email)))
      on conflict (order_id, notification_kind) do nothing;
    end if;
  elsif tg_op = 'UPDATE'
    and old.status is distinct from new.status
    and new.status = 'cancelled'
    and new.customer_email is not null then
    insert into public.order_notification_outbox (order_id, notification_kind, recipient_email)
    values (new.id, 'order_cancelled', lower(trim(new.customer_email)))
    on conflict (order_id, notification_kind) do nothing;
  end if;
  return new;
end;
$$;

revoke all on function public.enqueue_order_notifications() from public, anon, authenticated;

drop trigger if exists orders_enqueue_notifications on public.orders;
create trigger orders_enqueue_notifications
after insert or update of payment_status, status on public.orders
for each row execute function public.enqueue_order_notifications();
