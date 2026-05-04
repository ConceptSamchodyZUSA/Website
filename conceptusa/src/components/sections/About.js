import React, { useState } from 'react';
import { Shield, DollarSign, Truck, Star, ChevronDown } from 'lucide-react';

const About = ({ isVisible }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="about" className={`py-24 bg-concept-gray relative z-10 overflow-hidden ${isVisible ? 'visible' : ''}`}>
      {/* Diagonal top transition — visual connection from Hero */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-concept-red/30 to-transparent"></div>

      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-concept-red/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-concept-blue/10 rounded-full mix-blend-screen filter blur-[120px] opacity-60 pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-0 -right-48 w-[600px] h-[600px] bg-concept-red/10 rounded-full mix-blend-screen filter blur-[150px] opacity-40 pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 font-heading tracking-wider">
          Dlaczego <span className="text-concept-red">CONCEPT</span>?
        </h2>

        {/* Bento Box Layout for 'Dlaczego CONCEPT?' */}
        <div className="grid md:grid-cols-3 gap-6 md:auto-rows-[250px]">
          {/* Main feature - span 2 cols */}
          <div className="card-matte p-8 rounded-xl text-left group transition-all duration-500 hover:-translate-y-2 hover:border-concept-red/20 md:col-span-2 relative overflow-hidden flex flex-col justify-end">
            <div className="absolute top-8 right-8 text-concept-red opacity-20 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
              <Shield size={120} />
            </div>
            <div className="relative z-10 md:w-2/3">
              <div className="text-concept-red mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white tracking-wider font-heading">Bezpieczeństwo na pierwszy rzut oka</h3>
              <p className="text-slate-400 font-light leading-relaxed">Każdy sprowadzany przez nas samochód posiada sprawdzoną historię CarFax i pełną dokumentację aukcyjną. Nie ma miejsca na domysły.</p>
            </div>
          </div>

          <div className="card-matte p-8 rounded-xl text-left group transition-all duration-500 hover:-translate-y-2 hover:border-concept-gold/20 relative overflow-hidden flex flex-col justify-end">
            <div className="absolute top-6 right-6 text-concept-gold opacity-20 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
              <DollarSign size={80} />
            </div>
            <div className="relative z-10">
              <div className="text-concept-gold mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <DollarSign size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white tracking-wider font-heading">Najlepsze ceny</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">Import bezpośrednio z USA bez drogich pośredników krajowych.</p>
            </div>
          </div>

          <div className="card-matte p-8 rounded-xl text-left group transition-all duration-500 hover:-translate-y-2 hover:border-concept-blue/20 relative overflow-hidden flex flex-col justify-end">
            <div className="absolute top-6 right-6 text-concept-blue opacity-20 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
              <Truck size={80} />
            </div>
            <div className="relative z-10">
              <div className="text-concept-blue mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <Truck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white tracking-wider font-heading">Północna logistyka</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">Od zakupu po rejestrację - organizujemy transport prosto z portu w Gdyni.</p>
            </div>
          </div>

          <div className="card-matte p-8 rounded-xl text-left group transition-all duration-500 hover:-translate-y-2 hover:border-concept-chrome/20 md:col-span-2 relative overflow-hidden flex flex-col justify-end border-l-4 border-l-concept-red/30 hover:border-l-concept-red">
            <div className="absolute top-8 right-8 text-white opacity-5 group-hover:scale-110 group-hover:opacity-20 transition-all duration-500">
              <Star size={120} />
            </div>
            <div className="relative z-10 md:w-3/4">
              <div className="text-concept-chrome mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                <Star size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white tracking-wider font-heading">Wieloletnie doświadczenie</h3>
              <p className="text-slate-400 font-light leading-relaxed">Setki zadowolonych klientów i perfekcyjnie sprowadzonych aut, ugruntowane lata na dynamicznym rynku importu aut z za wielkiej wody.</p>
            </div>
          </div>
        </div>

        {/* Specjalizacja - Spotlight effect */}
        <div className="mt-24">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-10 font-heading tracking-wider">
            Nasza <span className="text-concept-red">specjalizacja</span>
          </h3>
          <div className="card-matte rounded-xl p-10 md:p-14 text-center relative overflow-hidden group">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-concept-red/5 via-transparent to-concept-gold/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

            <p className="relative z-10 text-lg md:text-2xl text-slate-300 mb-10 font-light tracking-wide">
              Specjalizujemy się głównie w markach grupy <span className="text-white font-semibold">Stellantis</span>
            </p>
            <div className="relative z-10 flex flex-wrap justify-center gap-4 text-sm md:text-base mb-10">
              {[
                { name: 'Chrysler', color: 'concept-red' },
                { name: 'Dodge', color: 'concept-red' },
                { name: 'Jeep', color: 'concept-gold' },
                { name: 'Fiat', color: 'concept-blue' },
                { name: 'Alfa Romeo', color: 'concept-red' }
              ].map((brand, i) => (
                <span key={i} className="group/badge relative overflow-hidden bg-white/5 border border-white/10 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-accent font-medium tracking-widest transition-all duration-300 hover:-translate-y-1 hover:border-white/30 cursor-default">
                  <span className="relative z-10">{brand.name}</span>
                </span>
              ))}
            </div>
            <p className="relative z-10 text-slate-400 text-sm font-light tracking-wide">
              oraz inne prestiżowe marki amerykańskie jak <span className="text-white font-medium">Ford</span> czy <span className="text-white font-medium">Chevrolet</span>
            </p>
          </div>
        </div>

        {/* Formy zakupu */}
        <div className="mt-24">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 font-heading tracking-wider">
            <span className="text-concept-gold">Formy zakupu</span>
          </h3>
          <p className="text-center text-slate-400 mb-10 font-light font-accent">Kliknij, aby zobaczyć szczegóły</p>

          <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            {/* Auto na gotowo */}
            <div className="flex flex-col">
              <div
                className={`flex flex-col items-center justify-center p-8 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-md ${expandedCard === 0
                  ? 'bg-concept-red/20 border-concept-red/50 shadow-[0_0_30px_rgba(227,24,55,0.2)] -translate-y-2'
                  : 'card-matte hover:-translate-y-1'
                  }`}
                onClick={() => toggleCard(0)}
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">🚗✨</div>
                <h4 className="text-lg font-bold text-white mb-2 tracking-wider font-heading">Auto na gotowo</h4>
                <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${expandedCard === 0 ? 'rotate-180' : ''}`} />
              </div>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCard === 0 ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="card-matte p-8 rounded-xl border-l-4 border-l-concept-red">
                  <h4 className="text-xl font-bold text-white mb-6 font-heading tracking-wider">Auto na gotowo</h4>
                  <ul className="space-y-4 text-slate-300 font-light">
                    <li className="flex items-center gap-3"><span className="text-concept-red font-bold">✓</span> Sprowadzone z USA</li>
                    <li className="flex items-center gap-3"><span className="text-concept-red font-bold">✓</span> Naprawione i sprawdzone</li>
                    <li className="flex items-center gap-3"><span className="text-concept-red font-bold">✓</span> Zarejestrowane w Polsce</li>
                    <li className="flex items-center gap-3"><span className="text-concept-red font-bold">✓</span> Wszystkie opłaty uregulowane</li>
                    <li className="flex items-center gap-3"><span className="text-concept-red font-bold">✓</span> <span className="font-semibold text-white">Gotowe do jazdy!</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Samochód pod dom */}
            <div className="flex flex-col">
              <div
                className={`flex flex-col items-center justify-center p-8 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-md ${expandedCard === 1
                  ? 'bg-concept-blue/20 border-concept-blue/50 shadow-[0_0_30px_rgba(91,123,154,0.2)] -translate-y-2'
                  : 'card-matte hover:-translate-y-1'
                  }`}
                onClick={() => toggleCard(1)}
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">🚚💰</div>
                <h4 className="text-lg font-bold text-white mb-2 tracking-wider font-heading">Samochód pod dom</h4>
                <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${expandedCard === 1 ? 'rotate-180' : ''}`} />
              </div>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCard === 1 ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="card-matte p-8 rounded-xl border-l-4 border-l-concept-blue">
                  <h4 className="text-xl font-bold text-white mb-6 font-heading tracking-wider">Samochód pod dom</h4>
                  <ul className="space-y-4 text-slate-300 font-light">
                    <li className="flex items-center gap-3"><span className="text-concept-blue font-bold">✓</span> Zakup w USA według Twoich wymagań</li>
                    <li className="flex items-center gap-3"><span className="text-concept-blue font-bold">✓</span> Transport do Polski</li>
                    <li className="flex items-center gap-3"><span className="text-concept-blue font-bold">✓</span> Odprawa celna w porcie Gdynia</li>
                    <li className="flex items-center gap-3"><span className="text-concept-blue font-bold">✓</span> Bez naprawy i rejestracji</li>
                    <li className="flex items-center gap-3"><span className="text-concept-blue font-bold">✓</span> <span className="font-semibold text-white">Niższa cena - większa elastyczność!</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Obsługa finansowa */}
        <div className="mt-24 card-matte border-t-2 border-t-concept-gold rounded-xl p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-concept-gold/5 to-transparent pointer-events-none"></div>
          <h3 className="text-2xl md:text-3xl font-bold mb-12 font-heading tracking-wider text-white">
            <span className="mr-3">💼</span> Profesjonalna obsługa finansowa i logistyczna
          </h3>

          <div className="grid md:grid-cols-3 gap-10 text-left max-w-6xl mx-auto relative z-10">
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="bg-concept-gold/10 text-concept-gold rounded-xl p-4 border border-concept-gold/20 shadow-[0_0_15px_rgba(212,168,83,0.15)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3 text-white tracking-wider font-heading">Pełna faktura VAT</h4>
                <p className="text-slate-400 font-light text-sm leading-relaxed">Na każdy sprzedany samochód wystawiamy pełną fakturę VAT. Działamy w pełni legalnie i transparentnie.</p>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="bg-concept-gold/10 text-concept-gold rounded-xl p-4 border border-concept-gold/20 shadow-[0_0_15px_rgba(212,168,83,0.15)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3 text-white tracking-wider font-heading">Kredyty i leasingi</h4>
                <p className="text-slate-400 font-light text-sm leading-relaxed">Oferujemy możliwość finansowania zakupu poprzez kredyt lub leasing. Pomożemy dobrać najlepszą opcję!</p>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="bg-concept-gold/10 text-concept-gold rounded-xl p-4 border border-concept-gold/20 shadow-[0_0_15px_rgba(212,168,83,0.15)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3 text-white tracking-wider font-heading">Port Gdynia</h4>
                <p className="text-slate-400 font-light text-sm leading-relaxed">Wszystkie odprawy celne realizujemy wyłącznie przez port w Gdyni. Szybko, sprawnie i bezpiecznie!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
