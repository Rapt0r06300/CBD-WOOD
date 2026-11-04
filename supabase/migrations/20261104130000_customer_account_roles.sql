-- Every authenticated customer gets an explicit, non-privileged account role.
-- Owner access remains a separate allow-list in public.owner_users.

alter table public.customer_profiles
  add column if not exists account_role text not null default 'customer';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.customer_profiles'::regclass
      and conname = 'customer_profiles_account_role_customer'
  ) then
    alter table public.customer_profiles
      add constraint customer_profiles_account_role_customer
      check (account_role = 'customer');
  end if;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.customer_profiles (id, account_role)
  values (new.id, 'customer')
  on conflict (id) do nothing;
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Backfill accounts that existed before the trigger was installed.
insert into public.customer_profiles (id, account_role)
select id, 'customer'
from auth.users
on conflict (id) do nothing;
