import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Cookie, Lock, Eye, FileText, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>Polityka Prywatności | CONCEPT - Samochody z USA</title>
        <meta name="description" content="Polityka prywatności i ochrony danych osobowych ConceptUSA. RODO, cookies, bezpieczeństwo danych." />
        <link rel="canonical" href="https://conceptusa.pl/privacy-policy" />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Shield size={48} className="text-white" />
            <h1 className="text-4xl md:text-5xl font-bold">Polityka Prywatności i Cookies</h1>
          </div>
          <p className="text-xl text-gray-100">
            CONCEPT - Samochody z USA
          </p>
          <p className="text-sm text-gray-200 mt-2">
            Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <FileText size={32} className="text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Wprowadzenie</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Niniejsza Polityka Prywatności opisuje zasady przetwarzania i ochrony danych osobowych
                  przekazanych przez użytkowników w związku z korzystaniem ze strony internetowej
                  <strong> conceptusa.pl</strong> (dalej: "Strona").
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Administratorem danych osobowych jest <strong>CONCEPT - Samochody z USA</strong>,
                  z siedzibą w Dębogórze-Wybudowanie, ul. Długa 24, 84-230.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Data Processing */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Lock size={32} className="text-green-500" />
            <h2 className="text-3xl font-bold">Przetwarzanie Danych Osobowych</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-blue-400">1. Jakie dane zbieramy?</h3>
              <p className="text-gray-300 mb-3">Zbieramy następujące dane osobowe:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong>Dane kontaktowe:</strong> imię, nazwisko, adres e-mail, numer telefonu</li>
                <li><strong>Dane dotyczące zapytań:</strong> marka, model, budżet, rok produkcji samochodu</li>
                <li><strong>Dane techniczne:</strong> adres IP, typ przeglądarki, system operacyjny</li>
                <li><strong>Dane o aktywności:</strong> odwiedzane strony, czas wizyty, źródło wejścia</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-blue-400">2. W jakim celu przetwarzamy dane?</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Obsługa zapytań ofertowych i kontakt z klientami</li>
                <li>Realizacja zamówień i świadczenie usług</li>
                <li>Marketing produktów i usług (za zgodą)</li>
                <li>Analiza ruchu na stronie i optymalizacja jej działania</li>
                <li>Ochrona przed nadużyciami i zapewnienie bezpieczeństwa</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-blue-400">3. Podstawa prawna przetwarzania</h3>
              <p className="text-gray-300 mb-3">Dane są przetwarzane na podstawie:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong>Art. 6 ust. 1 lit. a) RODO</strong> - zgoda użytkownika</li>
                <li><strong>Art. 6 ust. 1 lit. b) RODO</strong> - wykonanie umowy</li>
                <li><strong>Art. 6 ust. 1 lit. f) RODO</strong> - prawnie uzasadniony interes administratora</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-blue-400">4. Jak długo przechowujemy dane?</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Dane kontaktowe: do momentu wycofania zgody lub zakończenia współpracy</li>
                <li>Dane o transakcjach: przez okres wymagany przepisami prawa (min. 5 lat)</li>
                <li>Dane analityczne: maksymalnie 26 miesięcy (Google Analytics)</li>
                <li>Logi serwera: maksymalnie 12 miesięcy</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-blue-400">5. Udostępnianie danych osobowych</h3>
              <p className="text-gray-300 mb-3">Twoje dane możemy udostępniać:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li><strong>Dostawcy usług IT:</strong> hosting (Vercel), baza danych (Supabase)</li>
                <li><strong>Usługi e-mail:</strong> EmailJS do wysyłki wiadomości</li>
                <li><strong>Narzędzia analityczne:</strong> Google Analytics (za zgodą)</li>
                <li><strong>Organy państwowe:</strong> w przypadkach wymaganych prawem</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cookie Policy */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Cookie size={32} className="text-orange-500" />
            <h2 className="text-3xl font-bold">Polityka Cookies</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-orange-400">Czym są pliki cookie?</h3>
              <p className="text-gray-300 leading-relaxed">
                Pliki cookie to małe pliki tekstowe zapisywane na Twoim urządzeniu podczas przeglądania
                strony internetowej. Pomagają nam zapamiętać Twoje preferencje i poprawić jakość korzystania
                z naszej strony.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-orange-400">Rodzaje używanych cookies</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-bold text-lg mb-2 text-green-400">🔒 Niezbędne pliki cookie</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Cel:</strong> Umożliwiają podstawowe funkcje strony
                  </p>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Okres przechowywania:</strong> Sesja lub 12 miesięcy
                  </p>
                  <p className="text-gray-300 text-sm">
                    <strong>Przykłady:</strong> cookieConsent (preferencje cookies), session_id (sesja użytkownika)
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-lg mb-2 text-blue-400">📊 Pliki analityczne</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Cel:</strong> Analiza ruchu i zachowania użytkowników
                  </p>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Okres przechowywania:</strong> Do 26 miesięcy
                  </p>
                  <p className="text-gray-300 text-sm">
                    <strong>Dostawca:</strong> Google Analytics (_ga, _gid, _gat)
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-bold text-lg mb-2 text-orange-400">🎯 Pliki marketingowe</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Cel:</strong> Personalizacja reklam i remarketing
                  </p>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Okres przechowywania:</strong> Do 12 miesięcy
                  </p>
                  <p className="text-gray-300 text-sm">
                    <strong>Dostawca:</strong> Facebook Pixel, Google Ads
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-bold text-lg mb-2 text-purple-400">⚙️ Pliki funkcjonalne</h4>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Cel:</strong> Zapamiętywanie preferencji użytkownika
                  </p>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong>Okres przechowywania:</strong> Do 12 miesięcy
                  </p>
                  <p className="text-gray-300 text-sm">
                    <strong>Przykłady:</strong> Język, waluta, filtry wyszukiwania
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-3 text-orange-400">Jak zarządzać plikami cookie?</h3>
              <p className="text-gray-300 mb-3">
                Możesz kontrolować i zarządzać plikami cookie na kilka sposobów:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>Użyj naszego <strong>Baneru Cookie</strong> na dole strony</li>
                <li>Zmień ustawienia w swojej przeglądarce internetowej</li>
                <li>Użyj rozszerzeń blokujących cookies</li>
                <li>Regularnie czyść pliki cookie z urządzenia</li>
              </ul>
              <button
                onClick={() => window.openCookieSettings && window.openCookieSettings()}
                className="mt-4 bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-lg font-semibold transition"
              >
                Otwórz ustawienia cookies
              </button>
            </div>
          </div>
        </section>

        {/* User Rights */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Eye size={32} className="text-purple-500" />
            <h2 className="text-3xl font-bold">Twoje Prawa</h2>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <p className="text-gray-300 mb-4">
              Zgodnie z RODO, przysługują Ci następujące prawa:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-purple-400">✅ Prawo dostępu</h4>
                <p className="text-sm text-gray-300">
                  Możesz uzyskać informację, jakie dane o Tobie przetwarzamy
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-purple-400">✏️ Prawo do sprostowania</h4>
                <p className="text-sm text-gray-300">
                  Możesz poprawić nieprawidłowe lub niekompletne dane
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-purple-400">🗑️ Prawo do usunięcia</h4>
                <p className="text-sm text-gray-300">
                  Możesz żądać usunięcia swoich danych osobowych
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-purple-400">🚫 Prawo do ograniczenia</h4>
                <p className="text-sm text-gray-300">
                  Możesz ograniczyć przetwarzanie swoich danych
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-purple-400">📤 Prawo do przenoszenia</h4>
                <p className="text-sm text-gray-300">
                  Możesz otrzymać swoje dane w formacie umożliwiającym przeniesienie
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-purple-400">❌ Prawo sprzeciwu</h4>
                <p className="text-sm text-gray-300">
                  Możesz sprzeciwić się przetwarzaniu danych w celach marketingowych
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Mail size={32} className="text-red-500" />
            <h2 className="text-3xl font-bold">Kontakt w sprawie danych osobowych</h2>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-blue-900/30 rounded-lg p-6 border border-red-700">
            <p className="text-gray-300 mb-4">
              W sprawach związanych z ochroną danych osobowych oraz realizacją swoich praw, skontaktuj się z nami:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400 mb-1">Email:</p>
                <a href="mailto:conceptusacars@gmail.com" className="text-lg font-bold text-blue-400 hover:text-blue-300">
                  conceptusacars@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Telefon:</p>
                <a href="tel:691795116" className="text-lg font-bold text-blue-400 hover:text-blue-300">
                  +48 691 795 116
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Adres:</p>
                <p className="text-lg font-bold">
                  ul. Długa 24<br />
                  84-230 Dębogórze-Wybudowanie
                </p>
              </div>
            </div>
            <div className="mt-6 bg-blue-900/50 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                💡 <strong>Wskazówka:</strong> Odpowiemy na Twoje zapytanie w ciągu 30 dni od otrzymania.
                W uzasadnionych przypadkach możemy przedłużyć ten termin o kolejne 60 dni.
              </p>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mb-12">
          <div className="bg-green-900/30 rounded-lg p-6 border border-green-700">
            <div className="flex items-start gap-4">
              <Shield size={40} className="text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-3">Bezpieczeństwo danych</h3>
                <p className="text-gray-300 leading-relaxed mb-3">
                  Stosujemy nowoczesne środki techniczne i organizacyjne zapewniające bezpieczeństwo
                  przetwarzanych danych osobowych:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                  <li>Szyfrowanie połączeń HTTPS/SSL</li>
                  <li>Bezpieczne przechowywanie danych w bazie Supabase</li>
                  <li>Regularne kopie zapasowe</li>
                  <li>Ograniczony dostęp do danych osobowych</li>
                  <li>Monitoring bezpieczeństwa systemu</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Changes */}
        <section className="mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-3">Zmiany w Polityce Prywatności</h3>
            <p className="text-gray-300 leading-relaxed">
              Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności.
              O wszelkich zmianach poinformujemy na tej stronie. Data ostatniej aktualizacji
              znajduje się na górze dokumentu.
            </p>
          </div>
        </section>

        {/* Back Button */}
        <div className="text-center">
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700
                     px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
          >
            Wróć do strony głównej
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
