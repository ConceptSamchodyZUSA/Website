# Google Analytics Setup

## Jak skonfigurować Google Analytics:

### 1. Załóż konto Google Analytics
1. Idź do: https://analytics.google.com
2. Zaloguj się kontem Google
3. Kliknij **"Rozpocznij pomiar"**
4. Utwórz **Konto** (nazwa: "CONCEPT Samochody z USA")
5. Utwórz **Właściwość** (nazwa: "CONCEPT Website")
6. Wybierz **Web** jako platformę
7. Podaj URL strony: `https://twoja-domena.pl`

### 2. Skopiuj Measurement ID
1. Po utworzeniu właściwości zobaczysz **Measurement ID**
2. Format: `G-XXXXXXXXXX` (przykład: `G-ABC123DEF4`)
3. Skopiuj ten ID

### 3. Zaktualizuj index.html
1. Otwórz `/public/index.html`
2. Znajdź dwa miejsca z `G-XXXXXXXXXX`
3. Zamień na swój prawdziwy Measurement ID
4. Zapisz plik

### 4. Deploy
```bash
git add public/index.html
git commit -m "feat: add Google Analytics tracking"
git push origin main
```

### 5. Sprawdź czy działa
1. Wejdź na swoją stronę
2. W Google Analytics → Raporty → Czas rzeczywisty
3. Powinieneś zobaczyć swoją wizytę w ciągu 1-2 minut

---

## Co będziesz widzieć w Google Analytics:
- 📊 Liczba odwiedzin
- 🌍 Skąd pochodzą użytkownicy (miasta, kraje)
- 📱 Urządzenia (desktop, mobile, tablet)
- ⏱️ Czas spędzony na stronie
- 🔗 Z jakich stron przychodzą (Google, Facebook, bezpośrednio)
- 📄 Które podstrony są najpopularniejsze

---

## Ważne:
- Google Analytics jest **DARMOWY** ✅
- Zbiera dane **anonimowo**
- Może wymagać **zgody cookie** (RODO) - do dodania później
