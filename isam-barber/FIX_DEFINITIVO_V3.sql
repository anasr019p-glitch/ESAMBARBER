-- FIX DEFINITIVO V3 (A PROVA DI BOMBA 💣)
-- Questo script evita l'errore "bname" perché controlla il NOME del bucket prima di creare.

-- 1. Rendi pubblici i bucket se esistono già (cercando per nome)
update storage.buckets set public = true where name = 'gallery';
update storage.buckets set public = true where name = 'products';
update storage.buckets set public = true where name = 'staff';

-- 2. Crea i bucket SOLO se non esistono (evita duplicati)
insert into storage.buckets (id, name, public)
select 'gallery', 'gallery', true
where not exists (select 1 from storage.buckets where name = 'gallery');

insert into storage.buckets (id, name, public)
select 'products', 'products', true
where not exists (select 1 from storage.buckets where name = 'products');

insert into storage.buckets (id, name, public)
select 'staff', 'staff', true
where not exists (select 1 from storage.buckets where name = 'staff');

-- 3. PERMESSI STORAGE (Universali)
-- Rimuove vecchie policy
drop policy if exists "Universal Public Access" on storage.objects;
drop policy if exists "Allow ALL storage" on storage.objects;
drop policy if exists "Give me access" on storage.objects;

-- Crea Nuova Policy
create policy "Universal Public Access"
on storage.objects for all
using ( bucket_id in (select id from storage.buckets where name in ('gallery', 'products', 'staff')) )
with check ( bucket_id in (select id from storage.buckets where name in ('gallery', 'products', 'staff')) );

-- 4. RISISTEMIAMO TABELLE (Giusto per sicurezza)
alter table services enable row level security;
alter table bookings enable row level security;
alter table gallery enable row level security;
alter table products enable row level security;

drop policy if exists "allow_all" on gallery;
drop policy if exists "allow_all" on products;

create policy "allow_all" on gallery for all using (true) with check (true);
create policy "allow_all" on products for all using (true) with check (true);

DO $$
BEGIN
  RAISE NOTICE '✅ FIX V3 RIUSCITO: Nessun errore di duplicati!';
END $$;
