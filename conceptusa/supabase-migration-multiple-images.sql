-- Migration: Zmiana z single image na multiple images
-- Wykonaj w Supabase SQL Editor

-- 1. Dodaj kolumnę images jako TEXT[] (jeśli nie istnieje)
ALTER TABLE cars ADD COLUMN IF NOT EXISTS images TEXT[];

-- 2. Przenieś istniejące image_url do images[0] (jeśli są dane)
UPDATE cars
SET images = ARRAY[image_url]::TEXT[]
WHERE image_url IS NOT NULL AND (images IS NULL OR array_length(images, 1) IS NULL);

-- 3. Dla aut bez zdjęć, ustaw pustą tablicę
UPDATE cars
SET images = ARRAY[]::TEXT[]
WHERE images IS NULL;

-- 4. Dodaj constraint - images nie może być NULL
ALTER TABLE cars ALTER COLUMN images SET DEFAULT ARRAY[]::TEXT[];
ALTER TABLE cars ALTER COLUMN images SET NOT NULL;

-- 5. Opcjonalnie: usuń kolumnę image_url (jeśli chcesz, ale bezpieczniej zostawić dla backward compatibility)
-- ALTER TABLE cars DROP COLUMN image_url;

-- Sprawdzenie wyniku
SELECT id, brand, model, image_url, images FROM cars LIMIT 10;
