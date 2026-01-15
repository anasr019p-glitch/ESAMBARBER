-- Abilita estensioni necessarie
create extension if not exists "pgcrypto";

-- Creazione Tabelle (con controlli if not exists)

-- SERVICES
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null,
  category text,
  is_active boolean default true,
  sort_order integer default 0
);

-- BOOKINGS
create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  service_id uuid references services(id),
  location text not null,
  booking_date date not null,
  booking_time time not null,
  status text not null default 'pending',
  notes text,
  created_at timestamp with time zone default now()
);

-- GALLERY
create table if not exists gallery (
  id uuid default gen_random_uuid() primary key,
  title text,
  media_url text not null,
  media_type text not null,
  is_active boolean default true,
  sort_order integer default 0
);

-- STAFF
create table if not exists staff (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text,
  avatar_url text,
  is_active boolean default true
);

-- PRODUCTS
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric not null,
  stock integer default 0,
  discount numeric default 0,
  image_url text,
  category text,
  is_active boolean default true
);

-- ORDERS
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  total_amount numeric not null,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- REVIEWS
create table if not exists reviews (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- SETTINGS
create table if not exists settings (
  id uuid default gen_random_uuid() primary key,
  is_shop_open boolean default true,
  announcement text
);

-- RLS (Row Level Security)
alter table services enable row level security;
alter table bookings enable row level security;
alter table gallery enable row level security;
alter table staff enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table reviews enable row level security;
alter table settings enable row level security;

-- POLICIES (Use DO blocks to avoid errors if policy exists)
do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Public read access services') then
    create policy "Public read access services" on services for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Public read access bookings') then
    create policy "Public read access bookings" on bookings for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Public insert bookings') then
    create policy "Public insert bookings" on bookings for insert with check (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Public read access gallery') then
    create policy "Public read access gallery" on gallery for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Public read access staff') then
    create policy "Public read access staff" on staff for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Public read access products') then
    create policy "Public read access products" on products for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Public read access settings') then
    create policy "Public read access settings" on settings for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Public read access reviews') then
    create policy "Public read access reviews" on reviews for select using (true);
  end if;
  if not exists (select 1 from pg_policies where policyname = 'Public insert reviews') then
    create policy "Public insert reviews" on reviews for insert with check (true);
  end if;
end $$;

-- INSERT DEFAULT SETTINGS IF NOT EXIST
insert into settings (id, is_shop_open, announcement)
select gen_random_uuid(), true, 'Benvenuti da Isam Barber!'
where not exists (select 1 from settings);
