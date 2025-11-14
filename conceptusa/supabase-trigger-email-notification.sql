-- Database trigger to automatically send email when inquiry is created
-- Execute this in Supabase SQL Editor

-- Create function to call Edge Function
CREATE OR REPLACE FUNCTION notify_new_inquiry()
RETURNS TRIGGER AS $$
DECLARE
  request_id bigint;
BEGIN
  -- Call Edge Function asynchronously via pg_net
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-inquiry-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := jsonb_build_object(
      'name', NEW.name,
      'email', NEW.email,
      'phone', NEW.phone,
      'brand', NEW.brand,
      'model', NEW.model,
      'budget', NEW.budget,
      'year', NEW.year_range,
      'message', NEW.message,
      'car_id', NEW.car_id
    )
  ) INTO request_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on inquiries table
DROP TRIGGER IF EXISTS on_inquiry_created ON inquiries;

CREATE TRIGGER on_inquiry_created
  AFTER INSERT ON inquiries
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_inquiry();

-- Grant permissions
GRANT USAGE ON SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA net TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA net TO postgres, anon, authenticated, service_role;
