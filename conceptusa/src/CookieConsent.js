import React, { useState, useEffect } from 'react';
import { X, Cookie, Shield, BarChart3, Settings } from 'lucide-react';

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Load saved preferences
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      applyConsent(savedPreferences);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyConsent = (prefs) => {
    // Apply analytics consent
    if (prefs.analytics) {
      enableGoogleAnalytics();
    } else {
      disableGoogleAnalytics();
    }

    // Apply marketing consent
    if (prefs.marketing) {
      // Enable marketing cookies (Facebook Pixel, etc.)
      console.log('Marketing cookies enabled');
    }

    // Apply functional consent
    if (prefs.functional) {
      // Enable functional cookies
      console.log('Functional cookies enabled');
    }
  };

  const enableGoogleAnalytics = () => {
    // Enable Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', {
      'anonymize_ip': true,
      'cookie_flags': 'SameSite=None;Secure'
    });
    console.log('Google Analytics enabled');
  };

  const disableGoogleAnalytics = () => {
    // Disable Google Analytics
    window['ga-disable-G-XXXXXXXXXX'] = true;
    console.log('Google Analytics disabled');
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    applyConsent(allAccepted);
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    applyConsent(onlyNecessary);
    setShowBanner(false);
    setShowSettings(false);
  };

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    applyConsent(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleToggle = (key) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Function to reopen settings (called from footer)
  useEffect(() => {
    window.openCookieSettings = () => {
      const consent = localStorage.getItem('cookieConsent');
      if (consent) {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
      }
      setShowSettings(true);
      setShowBanner(true);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-[60] animate-fade-in"
           onClick={() => !showSettings && rejectAll()} />

      {/* Banner */}
      <div className={`fixed ${showSettings ? 'inset-4 md:inset-8' : 'bottom-4 left-4 right-4 md:left-8 md:right-8 md:bottom-8'}
                      bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl z-[61]
                      border-2 border-red-600/50 overflow-hidden transition-all duration-300
                      ${showSettings ? 'max-w-4xl mx-auto max-h-[90vh] overflow-y-auto' : 'max-w-6xl mx-auto'}`}>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-blue-600 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cookie size={28} className="text-white" />
            <h3 className="text-xl md:text-2xl font-bold">
              {showSettings ? 'Ustawienia Cookies' : 'Ta strona używa plików cookie'}
            </h3>
          </div>
          {showSettings && (
            <button
              onClick={rejectAll}
              className="text-white hover:text-gray-200 transition"
              aria-label="Zamknij ustawienia"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {!showSettings ? (
            // Simple Banner View
            <>
              <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
                Używamy plików cookie, aby zapewnić najlepszą jakość korzystania z naszej strony,
                analizować ruch i personalizować treści. Możesz wybrać, które pliki cookie chcesz zaakceptować.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800
                           px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
                >
                  Akceptuj wszystkie
                </button>
                <button
                  onClick={rejectAll}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Odrzuć wszystkie
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex-1 bg-transparent border-2 border-gray-600 hover:border-gray-500 hover:bg-gray-800
                           px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <Settings size={20} />
                  Dostosuj
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Kontynuując bez zmiany ustawień, akceptujesz naszą{' '}
                <button
                  onClick={() => setShowSettings(true)}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  politykę cookies
                </button>
              </p>
            </>
          ) : (
            // Detailed Settings View
            <>
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Kontroluj, jakie pliki cookie mogą być używane na tej stronie. Możesz zmienić te ustawienia w dowolnym momencie.
              </p>

              {/* Cookie Categories */}
              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Shield size={24} className="text-green-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg">Niezbędne pliki cookie</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          Wymagane do podstawowego działania strony. Nie mogą być wyłączone.
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-500 rounded-full px-3 py-1 text-xs font-bold">
                      Zawsze aktywne
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 ml-9">
                    Przechowują preferencje dotyczące cookies, informacje o sesji użytkownika.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <BarChart3 size={24} className="text-blue-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg">Pliki analityczne</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          Pomagają nam zrozumieć, jak odwiedzający korzystają z naszej strony.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handleToggle('analytics')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4
                                    peer-focus:ring-blue-800 rounded-full peer
                                    peer-checked:after:translate-x-full peer-checked:after:border-white
                                    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                    after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                                    peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 ml-9">
                    Google Analytics - zbiera anonimowe dane o odwiedzinach, czasie spędzonym na stronie, itp.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Cookie size={24} className="text-orange-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg">Pliki marketingowe</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          Używane do wyświetlania spersonalizowanych reklam.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => handleToggle('marketing')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4
                                    peer-focus:ring-orange-800 rounded-full peer
                                    peer-checked:after:translate-x-full peer-checked:after:border-white
                                    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                    after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                                    peer-checked:bg-orange-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 ml-9">
                    Facebook Pixel, remarketing - śledzą Twoje działania na stronie w celach reklamowych.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="bg-gray-800 rounded-lg p-5 border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Settings size={24} className="text-purple-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg">Pliki funkcjonalne</h4>
                        <p className="text-sm text-gray-400 mt-1">
                          Umożliwiają zaawansowane funkcje i personalizację.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => handleToggle('functional')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4
                                    peer-focus:ring-purple-800 rounded-full peer
                                    peer-checked:after:translate-x-full peer-checked:after:border-white
                                    after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                    after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                                    peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 ml-9">
                    Zapamiętują wybory (język, waluta, filtry) dla lepszego doświadczenia użytkownika.
                  </p>
                </div>
              </div>

              {/* Privacy Policy Link */}
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300">
                  📋 Aby dowiedzieć się więcej o tym, jak wykorzystujemy pliki cookie i przetwarzamy Twoje dane,
                  przeczytaj naszą <a href="/privacy-policy" className="text-blue-400 hover:text-blue-300 underline font-semibold">Politykę Prywatności</a>.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={savePreferences}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800
                           px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
                >
                  Zapisz preferencje
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Akceptuj wszystkie
                </button>
                <button
                  onClick={rejectAll}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Tylko niezbędne
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CookieConsentBanner;
