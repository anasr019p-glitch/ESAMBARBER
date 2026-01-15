-- FIX PERMESSI SUPABASE (RLS)
-- Esegui questo codice nell'SQL Editor di Supabase per sbloccare l'inserimento dati

DO $$
DECLARE
    t text;
BEGIN
    -- Lista delle tabelle del tuo progetto
    FOR t IN SELECT table_name 
             FROM information_schema.tables 
             WHERE table_schema = 'public' 
    LOOP
        -- Rimuove vecchie policy se esistono
        EXECUTE format('DROP POLICY IF EXISTS "Public access" ON %I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Public services" ON %I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Public bookings" ON %I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Public gallery" ON %I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Public staff" ON %I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Public products" ON %I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Public settings" ON %I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Public reviews" ON %I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Public orders" ON %I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Enable all access for everyone" ON %I', t);

        -- Crea una nuova policy che permette TUTTO a TUTTI (per test)
        EXECUTE format('CREATE POLICY "Enable all access for everyone" ON %I FOR ALL USING (true) WITH CHECK (true)', t);
        
        RAISE NOTICE 'Policy aggiornata per la tabella: %', t;
    END LOOP;
END $$;

-- Assicurati che RLS sia attivo (anche se lo avevamo già fatto)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
