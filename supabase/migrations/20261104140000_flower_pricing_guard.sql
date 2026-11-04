-- Only the printed flower tiers are billable until the owner validates another rule.
-- 50 g is exactly two validated 25 g lots; no intermediate price is invented.

create or replace function public.calculate_flower_price(p_product_id uuid, p_grams integer)
returns integer
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_price integer;
begin
  if p_product_id is null or p_grams is null or p_grams < 1 or p_grams > 50 then
    return null;
  end if;

  if p_grams not in (1, 3, 5, 10, 25, 50) then
    return null;
  end if;

  if p_grams = 50 then
    select price_cents * 2
      into v_price
      from public.product_prices
      where product_id = p_product_id and grams = 25 and price_cents > 0;
    return v_price;
  end if;

  select price_cents
    into v_price
    from public.product_prices
    where product_id = p_product_id and grams = p_grams and price_cents > 0;
  return v_price;
end;
$$;

revoke execute on function public.calculate_flower_price(uuid, integer) from public, anon, authenticated;
grant execute on function public.calculate_flower_price(uuid, integer) to service_role;
