-- Protect the private rate-limit buckets even if a future grant is widened.
-- The server-side function uses service_role; anon/authenticated keep no access.

alter table private.order_rate_limit_buckets enable row level security;

revoke all on table private.order_rate_limit_buckets from public, anon, authenticated;
grant all on table private.order_rate_limit_buckets to service_role;
