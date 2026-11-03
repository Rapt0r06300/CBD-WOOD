-- Product prices are normalized so flowers can keep the exact poster tiers
-- (1 g, 3 g, 5 g, 10 g and 25 g) without putting pricing logic in the browser.
create table if not exists public.product_prices (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  grams integer not null check (grams > 0),
  price_cents integer not null check (price_cents >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (product_id, grams)
);

create index if not exists product_prices_product_grams_idx
on public.product_prices(product_id, grams);

alter table public.product_prices enable row level security;

drop policy if exists product_prices_read on public.product_prices;
create policy product_prices_read
on public.product_prices for select
to anon, authenticated
using (
  exists (
    select 1 from public.products
    where products.id = product_prices.product_id
      and products.status = 'published'
  )
  or exists (
    select 1 from public.owner_users
    where owner_users.user_id = (select auth.uid())
  )
);

drop policy if exists product_prices_owner_insert on public.product_prices;
create policy product_prices_owner_insert
on public.product_prices for insert
to authenticated
with check (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

drop policy if exists product_prices_owner_update on public.product_prices;
create policy product_prices_owner_update
on public.product_prices for update
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
))
with check (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

drop policy if exists product_prices_owner_delete on public.product_prices;
create policy product_prices_owner_delete
on public.product_prices for delete
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

grant select on public.product_prices to anon, authenticated;
grant insert, update, delete on public.product_prices to authenticated;

alter table public.orders
  add column if not exists order_number text,
  add column if not exists pickup_code text,
  add column if not exists fulfillment_mode text not null default 'delivery',
  add column if not exists customer_phone text,
  add column if not exists delivery_address text;

alter table public.orders
  drop constraint if exists orders_fulfillment_mode_check;
alter table public.orders
  add constraint orders_fulfillment_mode_check
  check (fulfillment_mode in ('delivery', 'barla', 'borriglione'));

create unique index if not exists orders_order_number_uidx
on public.orders(order_number)
where order_number is not null;

create unique index if not exists orders_pickup_code_uidx
on public.orders(pickup_code)
where pickup_code is not null;

alter table public.order_items
  add column if not exists grams integer;
alter table public.order_items
  drop constraint if exists order_items_grams_check;
alter table public.order_items
  add constraint order_items_grams_check
  check (grams is null or grams > 0);

grant insert on public.orders to service_role;
grant insert on public.order_items to service_role;

-- The platform helper must never be callable through the public Data API.
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    execute 'revoke execute on function public.rls_auto_enable() from public, anon, authenticated';
  end if;
end;
$$;

create or replace function public.create_pending_order(payload jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  item jsonb;
  product_name text;
  product_category text;
  base_price integer;
  tier_price integer;
  unit_price integer;
  total_cents integer := 0;
  item_count integer := 0;
  order_id uuid;
  order_created_at timestamptz;
  product_id uuid;
  customer_id uuid;
  customer_email text;
  customer_name text;
  customer_phone text;
  delivery_address text;
  fulfillment_mode text;
  grams integer;
  quantity integer;
  order_number text;
  pickup_code text;
begin
  if payload is null or jsonb_typeof(payload->'items') <> 'array' then
    raise exception using message = 'La commande ne contient aucun article valide.', errcode = '22023';
  end if;

  if jsonb_array_length(payload->'items') < 1 or jsonb_array_length(payload->'items') > 50 then
    raise exception using message = 'La commande doit contenir entre 1 et 50 articles.', errcode = '22023';
  end if;

  customer_id := nullif(payload->>'customer_id', '')::uuid;
  customer_email := lower(trim(coalesce(payload->>'customer_email', '')));
  customer_name := nullif(trim(coalesce(payload->>'customer_name', '')), '');
  customer_phone := nullif(trim(coalesce(payload->>'customer_phone', '')), '');
  delivery_address := nullif(trim(coalesce(payload->>'delivery_address', '')), '');
  fulfillment_mode := trim(coalesce(payload->>'fulfillment_mode', ''));

  if customer_email = '' or customer_email !~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception using message = 'Une adresse e-mail valide est nécessaire.', errcode = '22023';
  end if;
  if fulfillment_mode not in ('delivery', 'barla', 'borriglione') then
    raise exception using message = 'Le mode de réception est invalide.', errcode = '22023';
  end if;
  if fulfillment_mode = 'delivery' and delivery_address is null then
    raise exception using message = 'Une adresse de livraison est nécessaire.', errcode = '22023';
  end if;

  for item in select value from jsonb_array_elements(payload->'items') loop
    product_id := (item->>'product_id')::uuid;
    grams := greatest(1, coalesce((item->>'grams')::integer, 1));
    quantity := coalesce((item->>'quantity')::integer, 1);
    if quantity < 1 or quantity > 99 then
      raise exception using message = 'La quantité demandée est invalide.', errcode = '22023';
    end if;

    select p.name, p.category, p.price_cents, pp.price_cents
      into product_name, product_category, base_price, tier_price
      from public.products p
      left join public.product_prices pp
        on pp.product_id = p.id and pp.grams = grams
      where p.id = product_id and p.status = 'published';

    if not found then
      raise exception using message = 'Un article n’est plus disponible.', errcode = '22023';
    end if;
    unit_price := coalesce(tier_price, case when grams = 1 then base_price end);
    if unit_price is null then
      raise exception using message = 'Le tarif de cet article est incomplet.', errcode = '22023';
    end if;
    total_cents := total_cents + unit_price * quantity;
    item_count := item_count + quantity;
  end loop;

  order_number := 'WOOD-' || to_char(clock_timestamp(), 'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
  pickup_code := case when fulfillment_mode = 'delivery' then null else upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)) end;

  insert into public.orders (
    customer_id, customer_email, customer_name, customer_phone, delivery_address,
    fulfillment_mode, status, payment_status, total_cents, order_number, pickup_code
  ) values (
    customer_id, customer_email, customer_name, customer_phone, delivery_address,
    fulfillment_mode, 'pending', 'pending', total_cents, order_number, pickup_code
  ) returning id, created_at into order_id, order_created_at;

  for item in select value from jsonb_array_elements(payload->'items') loop
    product_id := (item->>'product_id')::uuid;
    grams := greatest(1, coalesce((item->>'grams')::integer, 1));
    quantity := coalesce((item->>'quantity')::integer, 1);
    select p.name, p.category, p.price_cents, pp.price_cents
      into product_name, product_category, base_price, tier_price
      from public.products p
      left join public.product_prices pp
        on pp.product_id = p.id and pp.grams = grams
      where p.id = product_id and p.status = 'published';
    unit_price := coalesce(tier_price, case when grams = 1 then base_price end);
    insert into public.order_items (
      order_id, product_id, product_name, unit_price_cents, quantity, line_total_cents, grams
    ) values (
      order_id, product_id, product_name, unit_price, quantity, unit_price * quantity, grams
    );
  end loop;

  return jsonb_build_object(
    'id', order_id,
    'order_number', order_number,
    'pickup_code', pickup_code,
    'fulfillment_mode', fulfillment_mode,
    'total_cents', total_cents,
    'item_count', item_count,
    'created_at', order_created_at
  );
end;
$$;

revoke execute on function public.create_pending_order(jsonb) from public, anon, authenticated;
grant execute on function public.create_pending_order(jsonb) to service_role;

-- Keep the current WOOD flower catalogue in the backend with the exact card prices.
insert into public.products (slug, category, name, description, price_cents, image_path, stock_quantity, status)
values
  ('fleurs-nimbus-3000', 'fleurs', 'Nimbus 3000', 'CBD Boosté (strong). Choisissez le grammage souhaité.', 1500, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-ivory', 'fleurs', 'Ivory', 'CBD Boosté (strong). Choisissez le grammage souhaité.', 1500, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-velvet-kush', 'fleurs', 'Velvet Kush', 'CBD Boosté (strong). Choisissez le grammage souhaité.', 1200, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-pastraweed', 'fleurs', 'Pastraweed', 'CBD Boosté (strong). Choisissez le grammage souhaité.', 1200, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-euphoria', 'fleurs', 'Euphoria', 'CBD Boosté (strong). Choisissez le grammage souhaité.', 1200, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-purple', 'fleurs', 'Purple', 'CBD Soft (medium). Choisissez le grammage souhaité.', 1100, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-bloody-mary', 'fleurs', 'Bloody Mary', 'CBD classique. Choisissez le grammage souhaité.', 1000, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-cosmic-cbg', 'fleurs', 'Cosmic CBG', 'CBD classique. Choisissez le grammage souhaité.', 1000, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-charlotte', 'fleurs', 'Charlotte', 'CBD classique. Choisissez le grammage souhaité.', 1000, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-rainbow', 'fleurs', 'Rainbow', 'CBD classique. Choisissez le grammage souhaité.', 800, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-orange-bud', 'fleurs', 'Orange Bud', 'CBD classique. Choisissez le grammage souhaité.', 700, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-plutonium', 'fleurs', 'Plutonium', 'CBD classique. Choisissez le grammage souhaité.', 700, 'assets/fleurs.svg', 0, 'published'),
  ('fleurs-fanta-hazy', 'fleurs', 'Fanta Hazy', 'CBD classique. Choisissez le grammage souhaité.', 600, 'assets/fleurs.svg', 0, 'published')
on conflict (slug) do nothing;

insert into public.product_prices (product_id, grams, price_cents)
select p.id, v.grams, v.price_cents
from (values
  ('fleurs-nimbus-3000', 1, 1500), ('fleurs-nimbus-3000', 3, 4200), ('fleurs-nimbus-3000', 5, 7000), ('fleurs-nimbus-3000', 10, 13000), ('fleurs-nimbus-3000', 25, 26000),
  ('fleurs-ivory', 1, 1500), ('fleurs-ivory', 3, 4200), ('fleurs-ivory', 5, 7000), ('fleurs-ivory', 10, 13000), ('fleurs-ivory', 25, 26000),
  ('fleurs-velvet-kush', 1, 1200), ('fleurs-velvet-kush', 3, 3400), ('fleurs-velvet-kush', 5, 5500), ('fleurs-velvet-kush', 10, 10000), ('fleurs-velvet-kush', 25, 20000),
  ('fleurs-pastraweed', 1, 1200), ('fleurs-pastraweed', 3, 3400), ('fleurs-pastraweed', 5, 5500), ('fleurs-pastraweed', 10, 10000), ('fleurs-pastraweed', 25, 20000),
  ('fleurs-euphoria', 1, 1200), ('fleurs-euphoria', 3, 3400), ('fleurs-euphoria', 5, 5500), ('fleurs-euphoria', 10, 10000), ('fleurs-euphoria', 25, 20000),
  ('fleurs-purple', 1, 1100), ('fleurs-purple', 3, 3000), ('fleurs-purple', 5, 5000), ('fleurs-purple', 10, 10000), ('fleurs-purple', 25, 18000),
  ('fleurs-bloody-mary', 1, 1000), ('fleurs-bloody-mary', 3, 2800), ('fleurs-bloody-mary', 5, 4500), ('fleurs-bloody-mary', 10, 8000), ('fleurs-bloody-mary', 25, 16000),
  ('fleurs-cosmic-cbg', 1, 1000), ('fleurs-cosmic-cbg', 3, 2800), ('fleurs-cosmic-cbg', 5, 4500), ('fleurs-cosmic-cbg', 10, 8000), ('fleurs-cosmic-cbg', 25, 16000),
  ('fleurs-charlotte', 1, 1000), ('fleurs-charlotte', 3, 2800), ('fleurs-charlotte', 5, 4500), ('fleurs-charlotte', 10, 8000), ('fleurs-charlotte', 25, 16000),
  ('fleurs-rainbow', 1, 800), ('fleurs-rainbow', 3, 2200), ('fleurs-rainbow', 5, 3500), ('fleurs-rainbow', 10, 6000), ('fleurs-rainbow', 25, 12000),
  ('fleurs-orange-bud', 1, 700), ('fleurs-orange-bud', 3, 2000), ('fleurs-orange-bud', 5, 3000), ('fleurs-orange-bud', 10, 5000), ('fleurs-orange-bud', 25, 10000),
  ('fleurs-plutonium', 1, 700), ('fleurs-plutonium', 3, 2000), ('fleurs-plutonium', 5, 3000), ('fleurs-plutonium', 10, 5000), ('fleurs-plutonium', 25, 10000),
  ('fleurs-fanta-hazy', 1, 600), ('fleurs-fanta-hazy', 3, 1600), ('fleurs-fanta-hazy', 5, 2500), ('fleurs-fanta-hazy', 10, 4000), ('fleurs-fanta-hazy', 25, 8000)
) as v(slug, grams, price_cents)
join public.products p on p.slug = v.slug
on conflict (product_id, grams) do update set price_cents = excluded.price_cents, updated_at = now();
