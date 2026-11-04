-- Make the intentional deny-by-default policy explicit and cover both foreign keys.
drop policy if exists order_idempotency_no_public_access on public.order_idempotency_keys;
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
