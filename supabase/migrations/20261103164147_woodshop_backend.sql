create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null check (category in ('fleurs', 'resines', 'bien-etre', 'wood-shop')),
  name text not null,
  description text not null default '',
  price_cents integer check (price_cents is null or price_cents >= 0),
  image_path text,
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.owner_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role = 'owner'),
  created_at timestamptz not null default now()
);

create table if not exists public.customer_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) on delete set null,
  customer_email text not null,
  customer_name text,
  status text not null default 'pending' check (status in ('pending', 'paid', 'preparing', 'ready', 'completed', 'cancelled')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'refunded')),
  total_cents integer not null default 0 check (total_cents >= 0),
  viva_order_code text unique,
  viva_transaction_id text unique,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  unit_price_cents integer not null check (unit_price_cents >= 0),
  quantity integer not null check (quantity > 0),
  line_total_cents integer not null check (line_total_cents >= 0),
  created_at timestamptz not null default now()
);

create index if not exists products_category_status_idx on public.products(category, status);
create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists orders_status_idx on public.orders(status, payment_status);
create index if not exists order_items_order_id_idx on public.order_items(order_id);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
before update on public.products
for each row execute function public.touch_updated_at();

drop trigger if exists customer_profiles_touch_updated_at on public.customer_profiles;
create trigger customer_profiles_touch_updated_at
before update on public.customer_profiles
for each row execute function public.touch_updated_at();

drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at
before update on public.orders
for each row execute function public.touch_updated_at();

alter table public.products enable row level security;
alter table public.owner_users enable row level security;
alter table public.customer_profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists products_public_read on public.products;
create policy products_public_read
on public.products for select
to anon, authenticated
using (status = 'published');

drop policy if exists products_owner_read on public.products;
create policy products_owner_read
on public.products for select
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

drop policy if exists products_owner_insert on public.products;
create policy products_owner_insert
on public.products for insert
to authenticated
with check (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

drop policy if exists products_owner_update on public.products;
create policy products_owner_update
on public.products for update
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

drop policy if exists products_owner_delete on public.products;
create policy products_owner_delete
on public.products for delete
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

drop policy if exists owner_users_read_own on public.owner_users;
create policy owner_users_read_own
on public.owner_users for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists customer_profiles_read_own on public.customer_profiles;
create policy customer_profiles_read_own
on public.customer_profiles for select
to authenticated
using (id = (select auth.uid()));

drop policy if exists customer_profiles_insert_own on public.customer_profiles;
create policy customer_profiles_insert_own
on public.customer_profiles for insert
to authenticated
with check (id = (select auth.uid()));

drop policy if exists customer_profiles_update_own on public.customer_profiles;
create policy customer_profiles_update_own
on public.customer_profiles for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

drop policy if exists orders_customer_read_own on public.orders;
create policy orders_customer_read_own
on public.orders for select
to authenticated
using (customer_id = (select auth.uid()));

drop policy if exists orders_owner_read on public.orders;
create policy orders_owner_read
on public.orders for select
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

drop policy if exists orders_owner_update on public.orders;
create policy orders_owner_update
on public.orders for update
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

drop policy if exists order_items_customer_read on public.order_items;
create policy order_items_customer_read
on public.order_items for select
to authenticated
using (exists (
  select 1 from public.orders
  where orders.id = order_items.order_id
    and orders.customer_id = (select auth.uid())
));

drop policy if exists order_items_owner_read on public.order_items;
create policy order_items_owner_read
on public.order_items for select
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant select on public.owner_users to authenticated;
grant select, insert, update on public.customer_profiles to authenticated;
grant select, update on public.orders to authenticated;
grant select on public.order_items to authenticated;
