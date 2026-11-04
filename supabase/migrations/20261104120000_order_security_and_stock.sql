-- Order hardening: idempotency, delivery-only validation and atomic stock reservation.
-- This migration is intentionally additive and safe to run after the existing delivery-only migrations.

create table if not exists public.order_idempotency_keys (
  idempotency_key text primary key,
  customer_id uuid references auth.users(id) on delete set null,
  order_id uuid references public.orders(id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint order_idempotency_key_format check (idempotency_key ~ '^[A-Za-z0-9._:-]{16,128}$')
);

create index if not exists order_idempotency_created_at_idx
on public.order_idempotency_keys(created_at desc);

alter table public.order_idempotency_keys enable row level security;
revoke all on table public.order_idempotency_keys from public, anon, authenticated;
grant select, insert, update on table public.order_idempotency_keys to service_role;
create policy order_idempotency_no_public_access
on public.order_idempotency_keys for all
to public
using (false)
with check (false);
create index if not exists order_idempotency_customer_id_idx
on public.order_idempotency_keys(customer_id)
where customer_id is not null;
create index if not exists order_idempotency_order_id_idx
on public.order_idempotency_keys(order_id)
where order_id is not null;

create or replace function public.create_pending_order(payload jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = public
as $$
declare
  item jsonb;
  v_product_name text;
  v_category text;
  v_base_price integer;
  v_unit_price integer;
  v_total_cents integer := 0;
  v_item_count integer := 0;
  v_order_id uuid;
  v_existing_order_id uuid;
  v_order_created_at timestamptz;
  v_product_id uuid;
  v_customer_id uuid;
  v_customer_email text;
  v_customer_name text;
  v_customer_phone text;
  v_delivery_address text;
  v_fulfillment_mode text;
  v_grams integer;
  v_quantity integer;
  v_order_number text;
  v_pickup_code text;
  v_idempotency_key text;
begin
  if payload is null or jsonb_typeof(payload->'items') <> 'array' then
    raise exception using message = 'La commande ne contient aucun article valide.', errcode = '22023';
  end if;
  if jsonb_array_length(payload->'items') < 1 or jsonb_array_length(payload->'items') > 50 then
    raise exception using message = 'La commande doit contenir entre 1 et 50 articles.', errcode = '22023';
  end if;

  v_idempotency_key := nullif(trim(coalesce(payload->>'idempotency_key', '')), '');
  if v_idempotency_key is null or v_idempotency_key !~ '^[A-Za-z0-9._:-]{16,128}$' then
    raise exception using message = 'La référence de commande est invalide.', errcode = '22023';
  end if;

  v_customer_id := nullif(payload->>'customer_id', '')::uuid;
  v_customer_email := lower(trim(coalesce(payload->>'customer_email', '')));
  v_customer_name := nullif(trim(coalesce(payload->>'customer_name', '')), '');
  v_customer_phone := nullif(trim(coalesce(payload->>'customer_phone', '')), '');
  v_delivery_address := nullif(trim(coalesce(payload->>'delivery_address', '')), '');
  v_fulfillment_mode := trim(coalesce(payload->>'fulfillment_mode', ''));

  if v_customer_email = '' or v_customer_email !~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception using message = 'Une adresse e-mail valide est nécessaire.', errcode = '22023';
  end if;
  if v_fulfillment_mode <> 'delivery' then
    raise exception using message = 'La livraison à domicile est le seul mode de réception disponible.', errcode = '22023';
  end if;
  if v_delivery_address is null then
    raise exception using message = 'Une adresse de livraison est nécessaire.', errcode = '22023';
  end if;

  -- The insert is the idempotency claim. A concurrent retry waits for the first transaction.
  insert into public.order_idempotency_keys (idempotency_key, customer_id)
  values (v_idempotency_key, v_customer_id)
  on conflict (idempotency_key) do nothing;

  if not found then
    select order_id
      into v_existing_order_id
      from public.order_idempotency_keys
      where idempotency_key = v_idempotency_key
      for update;
    if v_existing_order_id is not null then
      select o.id, o.order_number, o.pickup_code, o.fulfillment_mode, o.total_cents, o.created_at
        into v_order_id, v_order_number, v_pickup_code, v_fulfillment_mode, v_total_cents, v_order_created_at
        from public.orders as o
        where o.id = v_existing_order_id;
      select coalesce(sum(oi.quantity), 0)::integer
        into v_item_count
        from public.order_items as oi
        where oi.order_id = v_existing_order_id;
      return jsonb_build_object(
        'id', v_order_id,
        'order_number', v_order_number,
        'pickup_code', v_pickup_code,
        'fulfillment_mode', v_fulfillment_mode,
        'total_cents', v_total_cents,
        'item_count', v_item_count,
        'created_at', v_order_created_at
      );
    end if;
  end if;

  -- Product rows are locked and decremented one item at a time. Any later error rolls back
  -- all decrements together with the order, so stock cannot be oversold.
  for item in select value from jsonb_array_elements(payload->'items') loop
    if coalesce(item->>'product_id', '') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
      raise exception using message = 'Un article de la commande est invalide.', errcode = '22023';
    end if;

    v_product_id := (item->>'product_id')::uuid;
    v_grams := (item->>'grams')::integer;
    v_quantity := (item->>'quantity')::integer;
    if v_grams < 1 or v_grams > 50 or v_quantity < 1 or v_quantity > 99 then
      raise exception using message = 'La quantité demandée est invalide.', errcode = '22023';
    end if;

    select p.name, p.category, p.price_cents
      into v_product_name, v_category, v_base_price
      from public.products as p
      where p.id = v_product_id and p.status = 'published' and p.stock_quantity >= v_quantity
      for update;
    if not found then
      raise exception using message = 'Un article n’est plus disponible en quantité suffisante.', errcode = 'P0001';
    end if;

    v_unit_price := case
      when v_category = 'fleurs' then public.calculate_flower_price(v_product_id, v_grams)
      when v_grams = 1 then v_base_price
      else null
    end;
    if v_unit_price is null then
      raise exception using message = 'Le tarif de cet article est incomplet.', errcode = '22023';
    end if;
    v_total_cents := v_total_cents + v_unit_price * v_quantity;
    v_item_count := v_item_count + v_quantity;

    update public.products
      set stock_quantity = stock_quantity - v_quantity
      where id = v_product_id and status = 'published' and stock_quantity >= v_quantity;
    if not found then
      raise exception using message = 'Un article n’est plus disponible en quantité suffisante.', errcode = 'P0001';
    end if;
  end loop;

  v_order_number := 'WOOD-' || to_char(clock_timestamp(), 'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
  v_pickup_code := null;

  insert into public.orders (customer_id, customer_email, customer_name, customer_phone, delivery_address, fulfillment_mode, status, payment_status, total_cents, order_number, pickup_code)
  values (v_customer_id, v_customer_email, v_customer_name, v_customer_phone, v_delivery_address, v_fulfillment_mode, 'pending', 'pending', v_total_cents, v_order_number, v_pickup_code)
  returning id, created_at into v_order_id, v_order_created_at;

  for item in select value from jsonb_array_elements(payload->'items') loop
    v_product_id := (item->>'product_id')::uuid;
    v_grams := (item->>'grams')::integer;
    v_quantity := (item->>'quantity')::integer;
    select p.name, p.category, p.price_cents
      into v_product_name, v_category, v_base_price
      from public.products as p
      where p.id = v_product_id and p.status = 'published';
    v_unit_price := case
      when v_category = 'fleurs' then public.calculate_flower_price(v_product_id, v_grams)
      when v_grams = 1 then v_base_price
      else null
    end;
    insert into public.order_items (order_id, product_id, product_name, unit_price_cents, quantity, line_total_cents, grams)
    values (v_order_id, v_product_id, v_product_name, v_unit_price, v_quantity, v_unit_price * v_quantity, v_grams);
  end loop;

  update public.order_idempotency_keys
    set order_id = v_order_id
    where idempotency_key = v_idempotency_key;

  return jsonb_build_object(
    'id', v_order_id,
    'order_number', v_order_number,
    'pickup_code', v_pickup_code,
    'fulfillment_mode', v_fulfillment_mode,
    'total_cents', v_total_cents,
    'item_count', v_item_count,
    'created_at', v_order_created_at
  );
end;
$$;

revoke execute on function public.create_pending_order(jsonb) from public, anon, authenticated;
grant execute on function public.create_pending_order(jsonb) to service_role;
