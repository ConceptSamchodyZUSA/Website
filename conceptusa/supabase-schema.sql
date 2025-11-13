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
    image_url TEXT, -- główne zdjęcie
    images JSONB, -- tablica URL-i do dodatkowych zdjęć
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

-- Polityki RLS - każdy może czytać auta
CREATE POLICY "Cars are viewable by everyone"
    ON cars FOR SELECT
    USING (true);

-- Tylko autoryzowani użytkownicy mogą dodawać/edytować auta
CREATE POLICY "Authenticated users can insert cars"
    ON cars FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update cars"
    ON cars FOR UPDATE
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete cars"
    ON cars FOR DELETE
    USING (auth.role() = 'authenticated');

-- Polityki dla inquiries
CREATE POLICY "Anyone can insert inquiries"
    ON inquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Authenticated users can view all inquiries"
    ON inquiries FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update inquiries"
    ON inquiries FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Przykładowe dane
INSERT INTO cars (brand, model, year, price, mileage, engine_capacity, horsepower, transmission, fuel_type, color, status, description, image_url) VALUES
('Ford', 'Mustang GT', 2022, 145000, 15000, 5.0, 450, 'automatic', 'gasoline', 'red', 'available', 'Kultowy amerykański muscle car w doskonałym stanie. Silnik V8 5.0L o mocy 450 KM. Full opcja.', 'https://images.unsplash.com/photo-1584345604476-8ec5f5a2d6f0?w=800'),
('Chevrolet', 'Camaro SS', 2023, 165000, 8000, 6.2, 455, 'automatic', 'gasoline', 'yellow', 'available', 'Chevrolet Camaro SS z silnikiem V8 6.2L. Niski przebieg, idealny stan techniczny.', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800'),
('Dodge', 'Challenger SRT', 2021, 185000, 22000, 6.4, 485, 'automatic', 'gasoline', 'black', 'sold', 'Dodge Challenger SRT Hellcat - ponad 700 KM mocy! SPRZEDANY', 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'),
('Tesla', 'Model 3', 2023, 195000, 5000, 0, 513, 'automatic', 'electric', 'white', 'available', 'Tesla Model 3 Performance. Elektryczny napęd, zasięg 500km. Autopilot.', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800'),
('Jeep', 'Wrangler Rubicon', 2022, 175000, 18000, 3.6, 285, 'automatic', 'gasoline', 'green', 'available', 'Jeep Wrangler Rubicon 4x4. Gotowy na każdą przygodę!', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800'),
('RAM', '1500 TRX', 2023, 285000, 3000, 6.2, 702, 'automatic', 'gasoline', 'grey', 'available', 'RAM 1500 TRX - najpotężniejszy pickup na rynku! Silnik Hellcat V8 o mocy 702 KM.', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800');

-- Widok do statystyk (opcjonalnie)
CREATE VIEW car_stats AS
SELECT
    COUNT(*) as total_cars,
    COUNT(*) FILTER (WHERE status = 'available') as available_cars,
    COUNT(*) FILTER (WHERE status = 'sold') as sold_cars,
    AVG(price) FILTER (WHERE status = 'available') as avg_price
FROM cars;
