alter function public.touch_updated_at() set search_path = public;

create index if not exists orders_customer_id_idx on public.orders(customer_id);
create index if not exists order_items_product_id_idx on public.order_items(product_id);

drop policy if exists products_public_read on public.products;
drop policy if exists products_owner_read on public.products;
create policy products_read
on public.products for select
to anon, authenticated
using (
  status = 'published'
  or exists (
    select 1 from public.owner_users
    where owner_users.user_id = (select auth.uid())
  )
);

drop policy if exists orders_customer_read_own on public.orders;
drop policy if exists orders_owner_read on public.orders;
create policy orders_read
on public.orders for select
to authenticated
using (
  customer_id = (select auth.uid())
  or exists (
    select 1 from public.owner_users
    where owner_users.user_id = (select auth.uid())
  )
);

drop policy if exists order_items_customer_read on public.order_items;
drop policy if exists order_items_owner_read on public.order_items;
create policy order_items_read
on public.order_items for select
to authenticated
using (
  exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
      and orders.customer_id = (select auth.uid())
  )
  or exists (
    select 1 from public.owner_users
    where owner_users.user_id = (select auth.uid())
  )
);
