-- Replace deprecated role-helper checks with the current JWT role claim.

-- No rows are changed; the existing security-definer behavior and grants remain unchanged.



create or replace function public.release_order_stock(
  p_order_id uuid,
  p_actor_id uuid,
  p_reason text default null
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor_id uuid := p_actor_id;
  v_order_status text;
  v_release_id bigint;
  v_item record;
begin
  if v_actor_id is null or not exists (
    select 1 from public.owner_users where owner_users.user_id = v_actor_id
  ) then
    raise exception using errcode = '42501', message = 'Acteur propriétaire invalide.';
  end if;

  if coalesce((select auth.jwt() ->> 'role'), '') <> 'service_role' and v_actor_id <> auth.uid() then
    raise exception using errcode = '42501', message = 'Acteur non autorisé.';
  end if;

  select status
  into v_order_status
  from public.orders
  where id = p_order_id
  for update;

  if not found then
    raise exception using errcode = 'P0002', message = 'Commande introuvable.';
  end if;
  if v_order_status <> 'cancelled' then
    raise exception using errcode = '22023', message = 'Le stock ne peut être libéré que pour une commande annulée.';
  end if;

  insert into public.order_stock_releases (order_id, actor_id, reason)
  values (p_order_id, v_actor_id, nullif(btrim(coalesce(p_reason, '')), ''))
  on conflict (order_id) do nothing
  returning id into v_release_id;

  if v_release_id is null then
    return false;
  end if;

  for v_item in
    select product_id, quantity
    from public.order_items
    where order_id = p_order_id
  loop
    if v_item.product_id is null then
      raise exception using errcode = '23514', message = 'Produit absent : libération de stock impossible.';
    end if;
    update public.products
    set stock_quantity = stock_quantity + v_item.quantity
    where id = v_item.product_id;
    if not found then
      raise exception using errcode = '23503', message = 'Produit introuvable : libération de stock impossible.';
    end if;
  end loop;

  return true;
end;
$$;

create or replace function public.service_update_order_status(
  p_order_id uuid,
  p_next_status text,
  p_reason text,
  p_actor_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders%rowtype;
  v_previous_status text;
  v_next_status text := lower(btrim(coalesce(p_next_status, '')));
  v_reason text := nullif(btrim(coalesce(p_reason, '')), '');
begin
  if coalesce((select auth.jwt() ->> 'role'), '') <> 'service_role' then
    raise exception using errcode = '42501', message = 'Fonction serveur uniquement.';
  end if;
  if p_actor_id is null or not exists (
    select 1 from public.owner_users where owner_users.user_id = p_actor_id
  ) then
    raise exception using errcode = '42501', message = 'Acteur propriétaire invalide.';
  end if;
  if v_next_status not in ('pending', 'paid', 'preparing', 'ready', 'completed', 'cancelled') then
    raise exception using errcode = '22023', message = 'État de commande inconnu.';
  end if;

  select * into v_order
  from public.orders
  where id = p_order_id
  for update;
  if not found then
    raise exception using errcode = 'P0002', message = 'Commande introuvable.';
  end if;

  v_previous_status := v_order.status;
  if v_previous_status = v_next_status then
    return jsonb_build_object('id', v_order.id, 'order_number', v_order.order_number, 'previous_status', v_previous_status, 'status', v_order.status, 'changed', false);
  end if;
  if v_next_status = 'cancelled' and v_reason is null then
    raise exception using errcode = '22023', message = 'Un motif est obligatoire pour annuler une commande.';
  end if;
  if v_reason is not null and char_length(v_reason) > 500 then
    raise exception using errcode = '22001', message = 'Le motif est limité à 500 caractères.';
  end if;
  if not (
    (v_previous_status = 'pending' and v_next_status = 'cancelled')
    or (v_previous_status = 'paid' and v_next_status in ('preparing', 'cancelled'))
    or (v_previous_status = 'preparing' and v_next_status in ('ready', 'completed', 'cancelled'))
    or (v_previous_status = 'ready' and v_next_status = 'completed')
  ) then
    raise exception using errcode = '22023', message = 'Transition de commande non autorisée.';
  end if;
  if v_next_status = 'preparing' and v_order.payment_status <> 'paid' then
    raise exception using errcode = '22023', message = 'La commande doit être payée avant sa préparation.';
  end if;

  insert into public.order_status_changes (order_id, actor_id, previous_status, next_status, reason)
  values (v_order.id, p_actor_id, v_previous_status, v_next_status, v_reason);
  update public.orders set status = v_next_status where id = v_order.id;
  if v_next_status = 'cancelled' then
    perform public.release_order_stock(v_order.id, p_actor_id, v_reason);
  end if;
  return jsonb_build_object('id', v_order.id, 'order_number', v_order.order_number, 'previous_status', v_previous_status, 'status', v_next_status, 'changed', true);
end;
$$;
