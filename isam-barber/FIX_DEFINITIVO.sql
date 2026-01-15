-- FIX DEFINITIVO PER ERRORI BUCKET E RLS
-- Copia e incolla tutto questo nell'SQL Editor di Supabase e premi RUN

-- 1. CREAZIONE BUCKET STORAGE (Risolve "Bucket not found")
insert into storage.buckets (id, name, public)
values 
  ('gallery', 'gallery', true),
  ('products', 'products', true),
  ('staff', 'staff', true)
on conflict (id) do update set public = true;

-- 2. PERMESSI STORAGE (Risolve errori di caricamento immagini)
-- Rimuove vecchie policy
drop policy if exists "Allow ALL storage" on storage.objects;
drop policy if exists "Public Access Gallery" on storage.objects;
drop policy if exists "Public Access Products" on storage.objects;

-- Crea policy unica per permettere TUTTO su questi bucket
create policy "Allow ALL storage"
on storage.objects for all
using ( bucket_id in ('gallery', 'products', 'staff') )
with check ( bucket_id in ('gallery', 'products', 'staff') );

-- 3. PERMESSI TABELLE (Risolve "new row violates row-level security policy")
-- Abilita RLS
alter table services enable row level security;
alter table bookings enable row level security;
alter table gallery enable row level security;
alter table staff enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table reviews enable row level security;
alter table settings enable row level security;

-- Pulisce vecchie policy
drop policy if exists "allow_all" on services;
drop policy if exists "allow_all" on bookings;
drop policy if exists "allow_all" on gallery;
drop policy if exists "allow_all" on staff;
drop policy if exists "allow_all" on products;
drop policy if exists "allow_all" on orders;
drop policy if exists "allow_all" on reviews;
drop policy if exists "allow_all" on settings;

drop policy if exists "Public services" on services;
drop policy if exists "Public bookings" on bookings;
drop policy if exists "Public gallery" on gallery;
drop policy if exists "Public staff" on staff;
drop policy if exists "Public products" on products;
drop policy if exists "Public orders" on orders;
drop policy if exists "Public reviews" on reviews;
drop policy if exists "Public settings" on settings;

-- Crea nuove policy permissive
create policy "allow_all" on services for all using (true) with check (true);
create policy "allow_all" on bookings for all using (true) with check (true);
create policy "allow_all" on gallery for all using (true) with check (true);
create policy "allow_all" on staff for all using (true) with check (true);
create policy "allow_all" on products for all using (true) with check (true);
create policy "allow_all" on orders for all using (true) with check (true);
create policy "allow_all" on reviews for all using (true) with check (true);
create policy "allow_all" on settings for all using (true) with check (true);

-- Notifica di successo
DO $$
BEGIN
  RAISE NOTICE '✅ FIX COMPLETATO: Buckets creati e permessi aggiornati.';
END $$;
