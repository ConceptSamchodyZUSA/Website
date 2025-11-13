-- ============================================
-- NAPRAW DOSTĘP DO FORMULARZA KONTAKTOWEGO
-- Wykonaj w Supabase SQL Editor
-- ============================================

-- Wyłącz RLS dla inquiries (formularz kontaktowy musi działać publicznie)
ALTER TABLE inquiries DISABLE ROW LEVEL SECURITY;

-- Pozostaw RLS włączony dla cars (tylko odczyt publiczny, zapis przez service role)
-- Cars pozostaje chroniony - już działa poprawnie
