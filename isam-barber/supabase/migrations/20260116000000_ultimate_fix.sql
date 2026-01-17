-- ULTIMATE FIX 2026-01-16
-- 1. STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('gallery', 'gallery', true),
  ('products', 'products', true),
  ('staff', 'staff', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. STORAGE POLICIES
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR ALL
USING ( bucket_id IN ('gallery', 'products', 'staff') )
WITH CHECK ( bucket_id IN ('gallery', 'products', 'staff') );

-- 3. SETTINGS INITIALIZATION
INSERT INTO public.settings (is_shop_open, announcement)
SELECT true, 'Benvenuti da Isam Barber!'
WHERE NOT EXISTS (SELECT 1 FROM public.settings);

-- 4. DEFAULT SERVICES
INSERT INTO public.services (name, description, price, category, is_active, sort_order)
VALUES 
  ('Taglio Capelli', 'Taglio classico o moderno', 20, 'Capelli', true, 1),
  ('Taglio Barba', 'Regolazione barba con panno caldo', 15, 'Barba', true, 2),
  ('Taglio & Barba', 'Combo completa relax', 30, 'Combo', true, 3)
ON CONFLICT DO NOTHING;

-- 5. RLS FOR ALL TABLES
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN SELECT table_name 
             FROM information_schema.tables 
             WHERE table_schema = 'public' 
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
        EXECUTE format('DROP POLICY IF EXISTS "Universal Access" ON public.%I', t);
        EXECUTE format('CREATE POLICY "Universal Access" ON public.%I FOR ALL USING (true) WITH CHECK (true)', t);
    END LOOP;
END $$;
