# Konfiguracja Gmail SMTP na Vercel (5 minut)

## 1️⃣ Wygeneruj hasło aplikacji Gmail

1. Otwórz: https://myaccount.google.com/security
2. Upewnij się że masz włączone **2-Step Verification** (weryfikacja dwuetapowa)
3. Kliknij **App passwords** (Hasła do aplikacji)
4. Wybierz:
   - App: **Mail**
   - Device: **Other** → wpisz "CONCEPT Website"
5. Kliknij **Generate**
6. **SKOPIUJ 16-znakowe hasło** (np. `abcd efgh ijkl mnop` - bez spacji)

---

## 2️⃣ Dodaj zmienne środowiskowe w Vercel

1. Otwórz: https://vercel.com/dashboard
2. Wybierz swój projekt (ConceptUSA)
3. Idź do **Settings** → **Environment Variables**
4. Dodaj 2 zmienne:

**Zmienna 1:**
- **Key:** `GMAIL_USER`
- **Value:** `conceptusacars@gmail.com`
- **Environment:** Production, Preview, Development

**Zmienna 2:**
- **Key:** `GMAIL_APP_PASSWORD`
- **Value:** `WKLEJ_TUTAJ_16_ZNAKOWE_HASLO` (bez spacji!)
- **Environment:** Production, Preview, Development

5. Kliknij **Save**

---

## 3️⃣ Redeploy projektu

W terminalu:

```bash
cd /home/jakubpospieszny/Documents/github/Website/conceptusa
git add -A
git commit -m "feat: add Gmail SMTP email notifications via Vercel"
git push origin main
```

Vercel automatycznie zrobi redeploy (~2 minuty).

---

## ✅ GOTOWE!

Teraz gdy ktoś wypełni formularz:
1. Zapisze się w Supabase
2. **Natychmiast wyśle email** na `conceptusacars@gmail.com`

**Żadnych dodatkowych stron, kont, API keys** - tylko Gmail i Vercel! 🚀

---

## 🧪 Test

Po deployment, wypełnij formularz na stronie - email przyjdzie w ~5 sekund!

---

## 🔧 Troubleshooting

**Problem:** Email nie przychodzi
- Sprawdź czy hasło aplikacji jest poprawne (16 znaków, bez spacji)
- Sprawdź Vercel logs: Dashboard → Deployments → Functions
- Sprawdź spam w Gmail

**Problem:** "Invalid login"
- Upewnij się że 2-Step Verification jest włączona w Gmail
- Wygeneruj nowe hasło aplikacji
