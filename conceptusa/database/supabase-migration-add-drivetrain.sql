-- Migration: Add drivetrain column to cars table
-- Execute this in Supabase SQL Editor

-- Add drivetrain column
ALTER TABLE cars ADD COLUMN IF NOT EXISTS drivetrain VARCHAR(10);

-- Add comment
COMMENT ON COLUMN cars.drivetrain IS 'Napęd: RWD (tył), FWD (przód), AWD/4WD (4 koła)';

-- Optional: Set default for existing rows
UPDATE cars SET drivetrain = 'RWD' WHERE drivetrain IS NULL;

-- Add index for filtering
CREATE INDEX IF NOT EXISTS idx_cars_drivetrain ON cars(drivetrain);
