-- ============================================
-- ALTERNATYWNE ROZWIĄZANIE - RLS Z ANON ROLE
-- Wykonaj w Supabase SQL Editor
-- ============================================

-- 1. Usuń starą politykę dla inquiries INSERT
DROP POLICY IF EXISTS "Enable insert for all users" ON inquiries;

-- 2. Stwórz nową politykę dla anon role
CREATE POLICY "Allow anonymous insert inquiries"
    ON inquiries FOR INSERT
    TO anon
    WITH CHECK (true);

-- 3. Dodatkowo pozwól authenticated users (opcjonalnie)
CREATE POLICY "Allow authenticated insert inquiries"
    ON inquiries FOR INSERT
    TO authenticated
    WITH CHECK (true);
