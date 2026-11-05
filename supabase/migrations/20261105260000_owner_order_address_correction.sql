-- Owner-only correction of a delivery address.
-- The original snapshot is kept in an append-only audit table; no public client
-- can update orders directly.

create table if not exists public.order_address_changes (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  actor_id uuid not null references auth.users(id) on delete restrict,
  previous_address text not null,
  next_address text not null,
  reason text not null,
  created_at timestamptz not null default now(),
  check (char_length(previous_address) between 1 and 500),
  check (char_length(next_address) between 1 and 500),
  check (char_length(reason) between 1 and 500)
);

create index if not exists order_address_changes_order_created_idx
on public.order_address_changes(order_id, created_at desc);

alter table public.order_address_changes enable row level security;
revoke all on table public.order_address_changes from public, anon, authenticated;
grant select on table public.order_address_changes to authenticated;
grant all on table public.order_address_changes to service_role;

drop policy if exists order_address_changes_owner_read on public.order_address_changes;
create policy order_address_changes_owner_read
on public.order_address_changes for select
to authenticated
using (exists (
  select 1 from public.owner_users
  where owner_users.user_id = (select auth.uid())
));

create or replace function public.owner_update_order_address(
  p_order_id uuid,
  p_delivery_address text,
  p_reason text
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_actor_id uuid := auth.uid();
  v_order public.orders%rowtype;
  v_next_address text;
  v_reason text;
begin
  if v_actor_id is null or not exists (
    select 1 from public.owner_users where owner_users.user_id = v_actor_id
  ) then
    raise exception using errcode = '42501', message = 'Accès propriétaire requis.';
  end if;

  v_next_address := nullif(regexp_replace(btrim(coalesce(p_delivery_address, '')), '[[:space:]]+', ' ', 'g'), '');
  v_reason := nullif(regexp_replace(btrim(coalesce(p_reason, '')), '[[:space:]]+', ' ', 'g'), '');
  if v_next_address is null then
    raise exception using errcode = '22023', message = 'Une adresse de livraison est nécessaire.';
  end if;
  if char_length(v_next_address) > 500 then
    raise exception using errcode = '22001', message = 'L’adresse est limitée à 500 caractères.';
  end if;
  if v_reason is null then
    raise exception using errcode = '22023', message = 'Un motif est obligatoire pour corriger une adresse.';
  end if;
  if char_length(v_reason) > 500 then
    raise exception using errcode = '22001', message = 'Le motif est limité à 500 caractères.';
  end if;

  select * into v_order
  from public.orders
  where id = p_order_id
  for update;
  if not found then
    raise exception using errcode = 'P0002', message = 'Commande introuvable.';
  end if;
  if v_order.delivery_address is not distinct from v_next_address then
    return jsonb_build_object(
      'id', v_order.id,
      'order_number', v_order.order_number,
      'address', v_order.delivery_address,
      'changed', false
    );
  end if;

  insert into public.order_address_changes (
    order_id, actor_id, previous_address, next_address, reason
  ) values (
    v_order.id, v_actor_id, coalesce(v_order.delivery_address, 'Adresse absente'), v_next_address, v_reason
  );

  update public.orders
  set delivery_address = v_next_address
  where id = v_order.id;

  return jsonb_build_object(
    'id', v_order.id,
    'order_number', v_order.order_number,
    'address', v_next_address,
    'changed', true
  );
end;
$$;

revoke all on function public.owner_update_order_address(uuid, text, text) from public, anon;
grant execute on function public.owner_update_order_address(uuid, text, text) to authenticated;
