-- Small server-side guard for repeated order submissions.
-- The Edge Function sends a one-way fingerprint, never a raw network address.

create schema if not exists private;

create table if not exists private.order_rate_limit_buckets (
  bucket_key text primary key check (length(bucket_key) between 32 and 128),
  window_started_at timestamptz not null default now(),
  request_count integer not null default 0 check (request_count >= 0),
  updated_at timestamptz not null default now()
);

revoke all on table private.order_rate_limit_buckets from public, anon, authenticated;
grant all on table private.order_rate_limit_buckets to service_role;

create index if not exists order_rate_limit_buckets_updated_idx
on private.order_rate_limit_buckets(updated_at);

create or replace function public.consume_order_rate_limit(
  p_bucket_key text,
  p_window_seconds integer default 60,
  p_max_requests integer default 8
)
returns boolean
language plpgsql
security definer
set search_path = private, public
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_window_started_at timestamptz;
  v_request_count integer;
begin
  if p_bucket_key is null or length(trim(p_bucket_key)) not between 32 and 128 then
    raise exception 'invalid rate limit bucket';
  end if;
  if p_window_seconds is null or p_window_seconds not between 10 and 3600 then
    raise exception 'invalid rate limit window';
  end if;
  if p_max_requests is null or p_max_requests not between 1 and 100 then
    raise exception 'invalid rate limit maximum';
  end if;

  insert into private.order_rate_limit_buckets (bucket_key, window_started_at, request_count, updated_at)
  values (trim(p_bucket_key), v_now, 0, v_now)
  on conflict (bucket_key) do nothing;

  select window_started_at, request_count
  into v_window_started_at, v_request_count
  from private.order_rate_limit_buckets
  where bucket_key = trim(p_bucket_key)
  for update;

  if v_now >= v_window_started_at + make_interval(secs => p_window_seconds) then
    update private.order_rate_limit_buckets
    set window_started_at = v_now, request_count = 1, updated_at = v_now
    where bucket_key = trim(p_bucket_key);
    return true;
  end if;

  if v_request_count >= p_max_requests then
    update private.order_rate_limit_buckets
    set updated_at = v_now
    where bucket_key = trim(p_bucket_key);
    return false;
  end if;

  update private.order_rate_limit_buckets
  set request_count = request_count + 1, updated_at = v_now
  where bucket_key = trim(p_bucket_key);
  return true;
end;
$$;

revoke all on function public.consume_order_rate_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_order_rate_limit(text, integer, integer) to service_role;
