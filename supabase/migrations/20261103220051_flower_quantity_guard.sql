create or replace function public.calculate_flower_price(p_product_id uuid, p_grams integer)
returns integer
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_best integer[];
  v_amount integer;
  v_candidate integer;
  v_previous integer;
  v_tier record;
begin
  if p_product_id is null or p_grams is null or p_grams < 1 then
    return null;
  end if;
  if p_grams > 50 then
    raise exception using message = 'Pour le moment, la quantité maximale par référence est de 50 g.', errcode = '22023';
  end if;

  v_best := array_fill(null::integer, array[p_grams + 1]);
  v_best[1] := 0;
  for v_amount in 1..p_grams loop
    v_candidate := null;
    for v_tier in
      select grams, price_cents
      from public.product_prices
      where product_id = p_product_id and grams <= v_amount
      order by grams desc
    loop
      v_previous := v_best[v_amount - v_tier.grams + 1];
      if v_previous is not null and (v_candidate is null or v_previous + v_tier.price_cents < v_candidate) then
        v_candidate := v_previous + v_tier.price_cents;
      end if;
    end loop;
    v_best[v_amount + 1] := v_candidate;
  end loop;
  return v_best[p_grams + 1];
end;
$$;

revoke execute on function public.calculate_flower_price(uuid, integer) from public, anon, authenticated;
grant execute on function public.calculate_flower_price(uuid, integer) to service_role;
