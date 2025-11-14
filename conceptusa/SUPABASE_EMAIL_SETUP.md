# Supabase Edge Function - Automatyczna wysyłka emaili

## 🚀 Konfiguracja (Krok po kroku)

### 1. **Zainstaluj Supabase CLI**

```bash
# macOS/Linux
brew install supabase/tap/supabase

# Windows (PowerShell)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
```

### 2. **Zaloguj się do Supabase**

```bash
cd /home/jakubpospieszny/Documents/github/Website/conceptusa
supabase login
```

### 3. **Połącz projekt**

```bash
# Znajdź swój Project Reference w Supabase Dashboard → Settings → General
supabase link --project-ref YOUR_PROJECT_REF
```

### 4. **Załóż konto Resend (darmowe)**

1. Idź na: https://resend.com/signup
2. Zweryfikuj email
3. Skopiuj **API Key** z Dashboard

### 5. **Dodaj API Key jako secret**

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
```

### 6. **Deploy Edge Function**

```bash
supabase functions deploy send-inquiry-email
```

### 7. **Włącz pg_net extension w Supabase**

W Supabase Dashboard → SQL Editor:

```sql
-- Enable pg_net extension for HTTP requests
CREATE EXTENSION IF NOT EXISTS pg_net;
```

### 8. **Ustaw Service Role Key**

W Supabase Dashboard → SQL Editor:

```sql
-- Set service role key for triggers
ALTER DATABASE postgres SET app.settings.service_role_key TO 'twój_service_role_key_z_dashboard';
```

### 9. **Wykonaj trigger SQL**

Otwórz `supabase-trigger-email-notification.sql` i:
1. Zamień `YOUR_PROJECT_REF` na swój Project Reference
2. Wykonaj w SQL Editor

---

## 📧 Weryfikacja domeny w Resend (opcjonalne)

Aby wysyłać z własnego emaila (np. kontakt@conceptusa.pl):

1. W Resend → Domains → Add Domain
2. Dodaj domenę `conceptusa.pl`
3. Dodaj rekordy DNS (MX, TXT, CNAME) w home.pl
4. Zmień w `index.ts` linię 7:
   ```typescript
   const FROM_EMAIL = 'kontakt@conceptusa.pl'
   ```
5. Redeploy: `supabase functions deploy send-inquiry-email`

---

## ✅ Jak to działa?

1. Użytkownik wypełnia formularz na stronie
2. Dane zapisują się w tabeli `inquiries` (Supabase)
3. **Trigger automatycznie wywołuje Edge Function**
4. Edge Function wysyła ładny email HTML przez Resend
5. Email trafia na `sklepelegant26@gmail.com`

---

## 🧪 Testowanie

```bash
# Test lokalny
supabase functions serve send-inquiry-email

# Test w innym terminalu
curl -i --location --request POST 'http://localhost:54321/functions/v1/send-inquiry-email' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Jan Kowalski",
    "email": "jan@example.com",
    "phone": "123456789",
    "brand": "Dodge",
    "model": "Charger",
    "message": "Test wiadomość"
  }'
```

---

## 💰 Limity

- **Resend Free**: 100 emaili/dzień, 3000/miesiąc
- **Supabase Edge Functions**: 500,000 wywołań/miesiąc za darmo
- **pg_net**: Unlimited w płatnym planie, 100/min w darmowym

---

## 🔧 Troubleshooting

**Problem:** Email nie wysyła się
- Sprawdź logi: `supabase functions logs send-inquiry-email`
- Sprawdź czy RESEND_API_KEY jest ustawiony: `supabase secrets list`

**Problem:** Trigger nie działa
- Sprawdź czy pg_net jest włączony: `SELECT * FROM pg_extension WHERE extname = 'pg_net';`
- Sprawdź logi triggera w Supabase → Database → Logs

**Problem:** 401 Unauthorized
- Upewnij się że service_role_key jest poprawny w `app.settings`
