-- FIX CORRETTO (Gestisce errori di duplicati)
-- Copia e incolla tutto questo nell'SQL Editor sostituendo quello precedente.

-- 1. AGGIORNAMENTO BUCKET (Senza creare duplicati)
-- Tenta di rendere pubblici i bucket se esistono già
update storage.buckets set public = true where name in ('gallery', 'products', 'staff');

-- Inserisce solo se NON esistono (gestendo il conflitto sul nome)
insert into storage.buckets (id, name, public)
values 
  ('gallery', 'gallery', true),
  ('products', 'products', true),
  ('staff', 'staff', true)
on conflict (id) do update set public = true;
-- Nota: se fallisce ancora per il nome, ignora l'errore perché significa che il bucket c'è già.

-- 2. PERMESSI STORAGE (Il pezzo più importante!)
-- Rimuove tutte le vecchie policy per evitare conflitti
drop policy if exists "Allow ALL storage" on storage.objects;
drop policy if exists "Give me access" on storage.objects;
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Public Access Gallery" on storage.objects;
drop policy if exists "Public Access Products" on storage.objects;
drop policy if exists "Public Access Staff" on storage.objects;

-- Crea una policy UNICA che apre tutto (Select, Insert, Update, Delete)
create policy "Universal Public Access"
on storage.objects for all
using ( bucket_id in ('gallery', 'products', 'staff') )
with check ( bucket_id in ('gallery', 'products', 'staff') );

-- 3. PERMESSI TABELLE (Risolve errori RLS sui dati)
-- Ri-abilita e pulisce
alter table services enable row level security;
alter table bookings enable row level security;
alter table gallery enable row level security;
alter table staff enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table reviews enable row level security;
alter table settings enable row level security;

-- Rimuove vecchie policy
drop policy if exists "allow_all" on services;
drop policy if exists "allow_all" on bookings;
drop policy if exists "allow_all" on gallery;
drop policy if exists "allow_all" on staff;
drop policy if exists "allow_all" on products;
drop policy if exists "allow_all" on orders;
drop policy if exists "allow_all" on reviews;
drop policy if exists "allow_all" on settings;

-- Crea nuove policy permissive
create policy "allow_all" on services for all using (true) with check (true);
create policy "allow_all" on bookings for all using (true) with check (true);
create policy "allow_all" on gallery for all using (true) with check (true);
create policy "allow_all" on staff for all using (true) with check (true);
create policy "allow_all" on products for all using (true) with check (true);
create policy "allow_all" on orders for all using (true) with check (true);
create policy "allow_all" on reviews for all using (true) with check (true);
create policy "allow_all" on settings for all using (true) with check (true);

DO $$
BEGIN
  RAISE NOTICE '✅ FIX COMPLETATO: Permessi aggiornati con successo.';
END $$;
