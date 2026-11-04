-- Product availability is explicit so the public catalogue never guesses a
-- commercial state from an incomplete stock or price record.
alter table public.products
  add column if not exists availability_state text not null default 'incomplete';

alter table public.products
  drop constraint if exists products_availability_state_check;

alter table public.products
  add constraint products_availability_state_check
  check (availability_state in ('available', 'soon', 'rupture', 'incomplete'));

create index if not exists products_availability_state_idx
on public.products(category, status, availability_state);
