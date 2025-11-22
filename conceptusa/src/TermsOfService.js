import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, FileText, Car, Shield, AlertCircle, Scale } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      <Helmet>
        <title>Regulamin | CONCEPT - Samochody z USA</title>
        <meta name="description" content="Regulamin świadczenia usług importu samochodów z USA. Warunki współpracy, gwarancje, obowiązki stron." />
        <link rel="canonical" href="https://conceptusa.pl/terms-of-service" />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-blue-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition"
          >
            <ArrowLeft size={20} />
            Powrót na stronę główną
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <FileText size={48} className="text-red-500" />
            <h1 className="text-4xl md:text-5xl font-bold">Regulamin Świadczenia Usług</h1>
          </div>
          <p className="text-xl text-gray-300">
            Zasady i warunki korzystania z usług CONCEPT - Samochody z USA
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Section 1 - Postanowienia ogólne */}
        <section className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Scale size={32} className="text-blue-500" />
            <h2 className="text-3xl font-bold">§1 Postanowienia ogólne</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">1. Administrator</h3>
              <p className="mb-2">Administratorem serwisu jest:</p>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <p><strong className="text-white">Concept Łukasz Grzenkowski</strong></p>
                <p>ul. Długa 24</p>
                <p>84-230 Dębogórze-Wybudowanie</p>
                <p className="mt-2">NIP: 5881948634</p>
                <p>REGON: 383279264</p>
                <p className="mt-2">Email: conceptusacars@gmail.com</p>
                <p>Tel: +48-691-795-116</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">2. Definicje</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong className="text-white">Serwis</strong> - strona internetowa dostępna pod adresem conceptusa.pl</li>
                <li><strong className="text-white">Administrator</strong> - Concept Łukasz Grzenkowski prowadzący działalność gospodarczą</li>
                <li><strong className="text-white">Użytkownik</strong> - osoba fizyczna, prawna lub jednostka organizacyjna korzystająca z Serwisu</li>
                <li><strong className="text-white">Usługa</strong> - import samochodów z USA, pośrednictwo w sprzedaży, doradztwo</li>
                <li><strong className="text-white">Konsument</strong> - osoba fizyczna dokonująca czynności prawnej niezwiązanej bezpośrednio z jej działalnością gospodarczą lub zawodową</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">3. Akceptacja Regulaminu</h3>
              <p>
                Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu. Przed skorzystaniem z usług
                należy zapoznać się z treścią Regulaminu.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 - Usługi */}
        <section className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Car size={32} className="text-red-500" />
            <h2 className="text-3xl font-bold">§2 Zakres usług</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-bold mb-3 text-red-400">1. Usługi świadczone przez CONCEPT</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Import samochodów z USA</li>
                <li>Poszukiwanie pojazdu zgodnie z preferencjami Klienta</li>
                <li>Weryfikacja historii pojazdu (Carfax, AutoCheck)</li>
                <li>Organizacja transportu z USA do Polski</li>
                <li>Odprawa celna w porcie Gdynia</li>
                <li>Rejestracja pojazdu w Polsce</li>
                <li>Pomoc w finansowaniu (kredyty, leasingi)</li>
                <li>Pośrednictwo w sprzedaży samochodów z USA</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-red-400">2. Proces realizacji usługi</h3>
              <ol className="space-y-2 list-decimal list-inside">
                <li>Kontakt z Klientem - zgłoszenie zapytania przez formularz lub telefon</li>
                <li>Ustalenie szczegółów - marka, model, budżet, preferencje</li>
                <li>Wyszukiwanie pojazdu - analiza rynku amerykańskiego</li>
                <li>Prezentacja ofert - przesłanie szczegółowych informacji o dostępnych pojazdach</li>
                <li>Decyzja Klienta - wybór pojazdu lub rezygnacja</li>
                <li>Podpisanie umowy - określenie warunków importu i płatności</li>
                <li>Zakup pojazdu - transakcja w USA</li>
                <li>Transport i odprawa celna</li>
                <li>Przekazanie pojazdu Klientowi</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-red-400">3. Formularz kontaktowy</h3>
              <p>
                Formularz kontaktowy służy wyłącznie do przesyłania zapytań. Wypełnienie formularza
                nie jest równoznaczne z zawarciem umowy ani zobowiązaniem do zakupu.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 - Warunki umowy */}
        <section className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Shield size={32} className="text-green-500" />
            <h2 className="text-3xl font-bold">§3 Warunki umowy i płatności</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-bold mb-3 text-green-400">1. Zawarcie umowy</h3>
              <p>
                Umowa o świadczenie usług importu samochodu zostaje zawarta po:
              </p>
              <ul className="space-y-2 list-disc list-inside mt-2">
                <li>Przedstawieniu szczegółowej oferty przez CONCEPT</li>
                <li>Akceptacji oferty przez Klienta</li>
                <li>Podpisaniu pisemnej umowy określającej warunki importu</li>
                <li>Wpłaceniu zaliczki (jeśli wymagana)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-green-400">2. Ceny i koszty</h3>
              <p className="mb-2">Całkowity koszt importu obejmuje:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Cenę pojazdu w USA</li>
                <li>Koszt transportu z USA do Polski</li>
                <li>Opłaty celne i skarbowe</li>
                <li>Koszty rejestracji w Polsce (opcjonalnie)</li>
                <li>Wynagrodzenie CONCEPT za obsługę importu</li>
              </ul>
              <p className="mt-4 bg-yellow-900/30 p-3 rounded border border-yellow-700">
                <strong className="text-yellow-400">⚠️ Ważne:</strong> Ostateczna cena może ulec zmianie
                w zależności od kursu USD, zmian w przepisach celnych lub dodatkowych kosztów transportu.
                Klient jest informowany o wszelkich zmianach przed finalizacją transakcji.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-green-400">3. Płatności</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Płatności realizowane są przelewem bankowym</li>
                <li>Możliwość finansowania przez kredyty i leasingi partnerskie</li>
                <li>Faktury VAT wystawiane zgodnie z przepisami polskiego prawa</li>
                <li>Terminy płatności określone w umowie</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-green-400">4. Termin realizacji</h3>
              <p>
                Czas importu samochodu z USA wynosi zazwyczaj <strong className="text-white">6-12 tygodni</strong> od momentu
                zakupu pojazdu i obejmuje:
              </p>
              <ul className="space-y-2 list-disc list-inside mt-2">
                <li>Transport z lokalizacji w USA do portu (1-2 tygodnie)</li>
                <li>Rejs morski do Gdyni (3-5 tygodni)</li>
                <li>Odprawa celna i formalności (1-2 tygodnie)</li>
                <li>Rejestracja (jeśli zamówiona) (1-2 tygodnie)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 - Prawa i obowiązki */}
        <section className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle size={32} className="text-orange-500" />
            <h2 className="text-3xl font-bold">§4 Prawa i obowiązki stron</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-bold mb-3 text-orange-400">1. Obowiązki CONCEPT</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Profesjonalne świadczenie usług importu samochodów</li>
                <li>Rzetelne informowanie o stanie technicznym i historii pojazdu</li>
                <li>Przedstawienie raportu Carfax/AutoCheck</li>
                <li>Prowadzenie transparentnej komunikacji na każdym etapie</li>
                <li>Przekazanie pojazdu w stanie zgodnym z opisem</li>
                <li>Wystawienie faktury VAT</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-orange-400">2. Obowiązki Klienta</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Przekazanie pełnych i prawdziwych danych kontaktowych</li>
                <li>Terminowa płatność zgodnie z umową</li>
                <li>Odbiór pojazdu w uzgodnionym terminie</li>
                <li>Zapoznanie się z Regulaminem i Polityką Prywatności</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-orange-400">3. Prawa Klienta</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Otrzymanie szczegółowych informacji o pojeździe przed zakupem</li>
                <li>Rezygnacja z usługi przed podpisaniem umowy bez ponoszenia kosztów</li>
                <li>Faktury VAT i dokumentacji importu</li>
                <li>Prawo do reklamacji zgodnie z polskim prawem</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5 - Reklamacje */}
        <section className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={32} className="text-purple-500" />
            <h2 className="text-3xl font-bold">§5 Reklamacje i odstąpienie od umowy</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">1. Prawo odstąpienia (dla Konsumentów)</h3>
              <p>
                Konsument ma prawo odstąpić od umowy zawartej na odległość w terminie <strong className="text-white">14 dni</strong> od dnia:
              </p>
              <ul className="space-y-2 list-disc list-inside mt-2">
                <li>Zawarcia umowy o świadczenie usług</li>
                <li>Odbioru pojazdu (w przypadku umowy sprzedaży)</li>
              </ul>
              <p className="mt-4 bg-red-900/30 p-3 rounded border border-red-700">
                <strong className="text-red-400">⚠️ Ograniczenia:</strong> Prawo odstąpienia nie przysługuje gdy:
                pojazd został już zakupiony w USA na zlecenie Klienta, rozpoczęto transport lub wykonano
                usługę w pełni za wyraźną zgodą Konsumenta.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">2. Reklamacje</h3>
              <p className="mb-2">Reklamacje należy składać:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Email: conceptusacars@gmail.com</li>
                <li>Telefon: +48-691-795-116</li>
                <li>Pisemnie na adres: ul. Długa 24, 84-230 Dębogórze-Wybudowanie</li>
              </ul>
              <p className="mt-4">
                Administrator rozpatrzy reklamację w terminie <strong className="text-white">14 dni roboczych</strong> od otrzymania.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-purple-400">3. Pozasądowe rozwiązywanie sporów</h3>
              <p>
                Konsument ma możliwość skorzystania z pozasądowych sposobów rozpatrywania reklamacji
                i dochodzenia roszczeń. Informacje dostępne na platformie ODR:
              </p>
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-400 hover:text-blue-300 underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </div>
          </div>
        </section>

        {/* Section 6 - Odpowiedzialność */}
        <section className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Shield size={32} className="text-blue-500" />
            <h2 className="text-3xl font-bold">§6 Odpowiedzialność i ograniczenia</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">1. Zakres odpowiedzialności</h3>
              <p>
                CONCEPT odpowiada za świadczone usługi zgodnie z polskim prawem. Nie ponosimy
                odpowiedzialności za:
              </p>
              <ul className="space-y-2 list-disc list-inside mt-2">
                <li>Ukryte wady pojazdu nieujawnione w raporcie Carfax/AutoCheck</li>
                <li>Opóźnienia spowodowane przez przewoźników, porty lub urz urzędy celne</li>
                <li>Zmiany w przepisach celnych lub podatkowych</li>
                <li>Wahania kursu USD wpływające na ostateczną cenę</li>
                <li>Działanie siły wyższej (katastrofy naturalne, strajki portowe, etc.)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-blue-400">2. Gwarancja</h3>
              <p>
                Samochody sprowadzane z USA są pojazdami używanymi i <strong className="text-white">nie posiadają gwarancji producenta</strong>.
                CONCEPT nie udziela gwarancji handlowej, chyba że zostało to wyraźnie uzgodnione w umowie.
              </p>
              <p className="mt-2">
                Klient ma prawo do rękojmi za wady zgodnie z Kodeksem Cywilnym.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7 - Dane osobowe */}
        <section className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Shield size={32} className="text-green-500" />
            <h2 className="text-3xl font-bold">§7 Ochrona danych osobowych</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <p>
              Administratorem danych osobowych jest Concept Łukasz Grzenkowski. Szczegółowe
              informacje dotyczące przetwarzania danych osobowych znajdują się w{' '}
              <Link to="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline">
                Polityce Prywatności
              </Link>.
            </p>
            <p>
              Dane osobowe przetwarzane są zgodnie z RODO (Rozporządzenie UE 2016/679) wyłącznie
              w celu realizacji usług, kontaktu z Klientem oraz wypełnienia obowiązków prawnych.
            </p>
          </div>
        </section>

        {/* Section 8 - Postanowienia końcowe */}
        <section className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={32} className="text-gray-500" />
            <h2 className="text-3xl font-bold">§8 Postanowienia końcowe</h2>
          </div>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-400">1. Zmiany Regulaminu</h3>
              <p>
                Administrator zastrzega sobie prawo do wprowadzania zmian w Regulaminie. Zmiany
                wchodzą w życie z dniem opublikowania na stronie. O zmianach Użytkownicy zostaną
                poinformowani na stronie głównej.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-400">2. Prawo właściwe</h3>
              <p>
                W sprawach nieuregulowanych Regulaminem stosuje się przepisy prawa polskiego,
                w szczególności:
              </p>
              <ul className="space-y-2 list-disc list-inside mt-2">
                <li>Kodeks Cywilny</li>
                <li>Ustawa o prawach konsumenta</li>
                <li>Ustawa o świadczeniu usług drogą elektroniczną</li>
                <li>RODO (Rozporządzenie UE 2016/679)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-400">3. Kontakt</h3>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <p className="mb-2">W razie pytań dotyczących Regulaminu, prosimy o kontakt:</p>
                <p>Email: conceptusacars@gmail.com</p>
                <p>Tel: +48-691-795-116</p>
                <p>Adres: ul. Długa 24, 84-230 Dębogórze-Wybudowanie</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-500">
                Regulamin obowiązuje od dnia: 17 listopada 2025 r.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Ostatnia aktualizacja: 17 listopada 2025 r.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6 mt-12 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
          >
            <ArrowLeft size={20} />
            Wróć na stronę główną
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
