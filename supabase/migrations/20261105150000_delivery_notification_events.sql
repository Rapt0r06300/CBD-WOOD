-- Keep every delivery event observable in the e-mail outbox.
-- A single (order_id, notification_kind) key was correct for order-level
-- messages, but it silently collapsed later delivery updates.

alter table if exists public.order_notification_outbox
  add column if not exists delivery_event_id uuid references public.delivery_events(id) on delete cascade;

alter table if exists public.order_notification_outbox
  drop constraint if exists order_notification_outbox_notification_kind_check;

alter table if exists public.order_notification_outbox
  add constraint order_notification_outbox_notification_kind_check
  check (notification_kind in (
    'order_created',
    'payment_confirmed',
    'invoice_ready',
    'delivery_update',
    'delivery_issue_alert',
    'order_cancelled',
    'refund_confirmed',
    'owner_order_alert'
  ));

alter table if exists public.order_notification_outbox
  drop constraint if exists order_notification_outbox_order_id_notification_kind_key;

create unique index if not exists order_notification_outbox_order_kind_idx
on public.order_notification_outbox(order_id, notification_kind)
where notification_kind not in ('delivery_update', 'delivery_issue_alert');

create unique index if not exists order_notification_outbox_delivery_event_idx
on public.order_notification_outbox(order_id, notification_kind, delivery_event_id)
where notification_kind in ('delivery_update', 'delivery_issue_alert')
  and delivery_event_id is not null;

create index if not exists order_notification_outbox_delivery_event_lookup_idx
on public.order_notification_outbox(delivery_event_id)
where delivery_event_id is not null;

