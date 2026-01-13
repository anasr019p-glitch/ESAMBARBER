-- Migration: enable_rls_policies
-- Created at: 1768134986

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Public can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can manage services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can manage bookings" ON bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can manage gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can manage settings" ON admin_settings FOR ALL USING (auth.role() = 'authenticated');;