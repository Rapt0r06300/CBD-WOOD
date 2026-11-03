alter table public.orders
  drop constraint if exists orders_fulfillment_mode_check;

alter table public.orders
  add constraint orders_fulfillment_mode_check
  check (fulfillment_mode = 'delivery');
