-- Final delivery-only guard for the current WOOD checkout.
--
-- Historical migrations mention Barla/Borriglione because they document an
-- older prototype. This migration deliberately does not delete the nullable
-- legacy pickup_code column: production must be backed up and reviewed before
-- any destructive schema cleanup. It does, however, refuse to apply if real
-- pickup data already exists and prevents new pickup values afterwards.

do $$
begin
  if exists (
    select 1
    from public.orders
    where fulfillment_mode <> 'delivery'
  ) then
    raise exception using
      message = 'Delivery-only cleanup blocked: existing non-delivery orders require an owner-approved migration.',
      errcode = '55006';
  end if;

  if exists (
    select 1
    from public.orders
    where pickup_code is not null
  ) then
    raise exception using
      message = 'Delivery-only cleanup blocked: existing pickup codes require an owner-approved backup and review.',
      errcode = '55006';
  end if;
end;
$$;

alter table public.orders
  drop constraint if exists orders_fulfillment_mode_check;

alter table public.orders
  add constraint orders_fulfillment_mode_delivery_check
  check (fulfillment_mode = 'delivery');

alter table public.orders
  drop constraint if exists orders_pickup_code_delivery_check;

alter table public.orders
  add constraint orders_pickup_code_delivery_check
  check (pickup_code is null);

drop index if exists public.orders_pickup_code_uidx;
