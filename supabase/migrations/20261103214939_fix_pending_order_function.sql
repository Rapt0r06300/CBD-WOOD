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
  v_tier_price integer;
  v_unit_price integer;
  v_total_cents integer := 0;
  v_item_count integer := 0;
  v_order_id uuid;
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
begin
  if payload is null or jsonb_typeof(payload->'items') <> 'array' then
    raise exception using message = 'La commande ne contient aucun article valide.', errcode = '22023';
  end if;
  if jsonb_array_length(payload->'items') < 1 or jsonb_array_length(payload->'items') > 50 then
    raise exception using message = 'La commande doit contenir entre 1 et 50 articles.', errcode = '22023';
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
  if v_fulfillment_mode not in ('delivery', 'barla', 'borriglione') then
    raise exception using message = 'Le mode de réception est invalide.', errcode = '22023';
  end if;
  if v_fulfillment_mode = 'delivery' and v_delivery_address is null then
    raise exception using message = 'Une adresse de livraison est nécessaire.', errcode = '22023';
  end if;

  for item in select value from jsonb_array_elements(payload->'items') loop
    v_product_id := (item->>'product_id')::uuid;
    v_grams := greatest(1, coalesce((item->>'grams')::integer, 1));
    v_quantity := coalesce((item->>'quantity')::integer, 1);
    if v_quantity < 1 or v_quantity > 99 then
      raise exception using message = 'La quantité demandée est invalide.', errcode = '22023';
    end if;

    select p.name, p.category, p.price_cents, pp.price_cents
      into v_product_name, v_category, v_base_price, v_tier_price
      from public.products as p
      left join public.product_prices as pp
        on pp.product_id = p.id and pp.grams = v_grams
      where p.id = v_product_id and p.status = 'published';
    if not found then
      raise exception using message = 'Un article n’est plus disponible.', errcode = '22023';
    end if;
    v_unit_price := coalesce(v_tier_price, case when v_grams = 1 then v_base_price end);
    if v_unit_price is null then
      raise exception using message = 'Le tarif de cet article est incomplet.', errcode = '22023';
    end if;
    v_total_cents := v_total_cents + v_unit_price * v_quantity;
    v_item_count := v_item_count + v_quantity;
  end loop;

  v_order_number := 'WOOD-' || to_char(clock_timestamp(), 'YYYYMMDD') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
  v_pickup_code := case when v_fulfillment_mode = 'delivery' then null else upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)) end;

  insert into public.orders (customer_id, customer_email, customer_name, customer_phone, delivery_address, fulfillment_mode, status, payment_status, total_cents, order_number, pickup_code)
  values (v_customer_id, v_customer_email, v_customer_name, v_customer_phone, v_delivery_address, v_fulfillment_mode, 'pending', 'pending', v_total_cents, v_order_number, v_pickup_code)
  returning id, created_at into v_order_id, v_order_created_at;

  for item in select value from jsonb_array_elements(payload->'items') loop
    v_product_id := (item->>'product_id')::uuid;
    v_grams := greatest(1, coalesce((item->>'grams')::integer, 1));
    v_quantity := coalesce((item->>'quantity')::integer, 1);
    select p.name, p.category, p.price_cents, pp.price_cents
      into v_product_name, v_category, v_base_price, v_tier_price
      from public.products as p
      left join public.product_prices as pp
        on pp.product_id = p.id and pp.grams = v_grams
      where p.id = v_product_id and p.status = 'published';
    v_unit_price := coalesce(v_tier_price, case when v_grams = 1 then v_base_price end);
    insert into public.order_items (order_id, product_id, product_name, unit_price_cents, quantity, line_total_cents, grams)
    values (v_order_id, v_product_id, v_product_name, v_unit_price, v_quantity, v_unit_price * v_quantity, v_grams);
  end loop;

  return jsonb_build_object('id', v_order_id, 'order_number', v_order_number, 'pickup_code', v_pickup_code, 'fulfillment_mode', v_fulfillment_mode, 'total_cents', v_total_cents, 'item_count', v_item_count, 'created_at', v_order_created_at);
end;
$$;

revoke execute on function public.create_pending_order(jsonb) from public, anon, authenticated;
grant execute on function public.create_pending_order(jsonb) to service_role;
