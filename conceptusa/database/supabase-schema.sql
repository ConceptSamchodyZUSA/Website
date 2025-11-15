-- Supabase Database Schema for ConceptUSA Cars
-- Wykonaj ten skrypt w Supabase SQL Editor

-- Tworzenie tabeli samochodów
CREATE TABLE cars (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    mileage INTEGER NOT NULL,
    engine_capacity DECIMAL(4, 1), -- pojemność silnika w litrach (np. 5.0)
    horsepower INTEGER, -- moc w KM
    transmission VARCHAR(50), -- skrzynia biegów (automatic/manual)
    fuel_type VARCHAR(50), -- typ paliwa (gasoline/diesel/electric/hybrid)
    color VARCHAR(50),
    vin VARCHAR(17), -- numer VIN
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'available', -- available/sold/reserved
    featured BOOLEAN DEFAULT false, -- czy wyróżniony na stronie głównej
    image_url TEXT, -- główne zdjęcie (DEPRECATED - używaj images[0])
    images TEXT[], -- tablica URL-i do zdjęć (pierwsze = główne)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sold_at TIMESTAMP WITH TIME ZONE
);

-- Indeksy dla lepszej wydajności
CREATE INDEX idx_cars_status ON cars(status);
CREATE INDEX idx_cars_brand ON cars(brand);
CREATE INDEX idx_cars_price ON cars(price);
CREATE INDEX idx_cars_year ON cars(year);
CREATE INDEX idx_cars_featured ON cars(featured);

-- Trigger do automatycznej aktualizacji updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Tabela dla zapytań kontaktowych / zamówień
CREATE TABLE inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(50),
    brand VARCHAR(100),
    model VARCHAR(100),
    budget DECIMAL(10, 2),
    year_range VARCHAR(50),
    message TEXT,
    status VARCHAR(20) DEFAULT 'new', -- new/contacted/closed
    car_id UUID REFERENCES cars(id), -- jeśli zapytanie dotyczy konkretnego auta
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLITYKI RLS DLA TABELI CARS
-- ============================================

-- Każdy może czytać samochody (dla strony głównej)
CREATE POLICY "Enable read access for all users"
    ON cars FOR SELECT
    USING (true);

-- Service role może wszystko (dla panelu admina używającego service_role key)
-- Te operacje będą wykonywane z backendu/service role key
CREATE POLICY "Enable all access for service role"
    ON cars FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================
-- POLITYKI RLS DLA TABELI INQUIRIES
-- ============================================

-- Każdy może dodawać zapytania (formularz kontaktowy)
CREATE POLICY "Enable insert for all users"
    ON inquiries FOR INSERT
    WITH CHECK (true);

-- Service role może wszystko (dla panelu admina)
CREATE POLICY "Enable all access for service role inquiries"
    ON inquiries FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role');

-- Widok do statystyk (opcjonalnie)
CREATE VIEW car_stats AS
SELECT
    COUNT(*) as total_cars,
    COUNT(*) FILTER (WHERE status = 'available') as available_cars,
    COUNT(*) FILTER (WHERE status = 'sold') as sold_cars,
    AVG(price) FILTER (WHERE status = 'available') as avg_price
FROM cars;
