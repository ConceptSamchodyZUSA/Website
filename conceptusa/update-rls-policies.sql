-- ============================================
-- AKTUALIZACJA POLITYK RLS
-- Wykonaj w Supabase SQL Editor
-- ============================================

-- 1. Usuń stare polityki
DROP POLICY IF EXISTS "Cars are viewable by everyone" ON cars;
DROP POLICY IF EXISTS "Authenticated users can insert cars" ON cars;
DROP POLICY IF EXISTS "Authenticated users can update cars" ON cars;
DROP POLICY IF EXISTS "Authenticated users can delete cars" ON cars;
DROP POLICY IF EXISTS "Anyone can insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can view all inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON inquiries;

-- 2. Włącz RLS (jeśli wyłączone)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- NOWE POLITYKI RLS DLA TABELI CARS
-- ============================================

-- Każdy może czytać samochody (dla strony głównej)
CREATE POLICY "Enable read access for all users"
    ON cars FOR SELECT
    USING (true);

-- Service role może wszystko (dla panelu admina używającego service_role key)
CREATE POLICY "Enable all access for service role"
    ON cars FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================
-- NOWE POLITYKI RLS DLA TABELI INQUIRIES
-- ============================================

-- Każdy może dodawać zapytania (formularz kontaktowy)
CREATE POLICY "Enable insert for all users"
    ON inquiries FOR INSERT
    WITH CHECK (true);

-- Service role może wszystko (dla panelu admina)
CREATE POLICY "Enable all access for service role inquiries"
    ON inquiries FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role');
