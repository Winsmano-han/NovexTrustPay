-- Run this in Supabase SQL editor
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  username text unique,
  phone text,
  country text,
  address text,
  city text,
  state text,
  postal_code text,
  account_type text,
  transaction_pin_hash text,
  email_verified boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "users can select own profile"
on public.profiles for select
using (auth.uid() = user_id);

create policy "users can update own profile"
on public.profiles for update
using (auth.uid() = user_id);

create policy "users can insert own profile"
on public.profiles for insert
with check (auth.uid() = user_id);

create or replace function public.set_transaction_pin(pin text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  if length(pin) < 4 or length(pin) > 6 or pin !~ '^[0-9]+$' then
    raise exception 'PIN must be 4 to 6 digits';
  end if;

  update public.profiles
  set transaction_pin_hash = crypt(pin, gen_salt('bf')),
      updated_at = now()
  where user_id = auth.uid();
end;
$$;

create or replace function public.verify_transaction_pin(pin text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  ok boolean;
begin
  if auth.uid() is null then
    return false;
  end if;

  select (transaction_pin_hash = crypt(pin, transaction_pin_hash))
  into ok
  from public.profiles
  where user_id = auth.uid();

  return coalesce(ok, false);
end;
$$;

create or replace function public.create_profile_on_signup()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    user_id,
    full_name,
    username,
    phone,
    country,
    address,
    city,
    state,
    postal_code,
    account_type
  ) values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'country',
    new.raw_user_meta_data->>'address',
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'state',
    new.raw_user_meta_data->>'postal_code',
    new.raw_user_meta_data->>'account_type'
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.create_profile_on_signup();
