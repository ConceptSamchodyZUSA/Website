import React, { useState } from 'react';
import { Shield, DollarSign, Truck, Star, ChevronDown } from 'lucide-react';

const About = ({ isVisible }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="about" className={`py-24 bg-concept-dark relative z-10 ${isVisible ? 'visible' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-heading">
          Dlaczego <span className="text-concept-red">CONCEPT</span>?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Shield size={40} />, title: 'Bezpieczeństwo', desc: 'Sprawdzona historia pojazdu i pełna dokumentacja' },
            { icon: <DollarSign size={40} />, title: 'Najlepsze ceny', desc: 'Import bezpośrednio z USA bez pośredników' },
            { icon: <Truck size={40} />, title: 'Pełna obsługa', desc: 'Od zakupu po rejestrację - wszystko załatwiamy' },
            { icon: <Star size={40} />, title: 'Doświadczenie', desc: 'Setki zadowolonych klientów i sprowadzonych aut' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="glass p-8 rounded-2xl text-center group transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
            >
              <div className="text-concept-red flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white tracking-wide">{item.title}</h3>
              <p className="text-slate-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Specjalizacja */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center mb-8 font-heading">
            Nasza <span className="text-concept-red">specjalizacja</span>
          </h3>
          <div className="glass-panel rounded-2xl p-10 text-center">
            <p className="text-lg md:text-xl text-slate-300 mb-8 font-light">
              Specjalizujemy się głównie w markach grupy <span className="text-concept-blue font-semibold tracking-wide">Stellantis</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base mb-8">
              <span className="bg-concept-red/10 border border-concept-red/30 text-white px-6 py-2.5 rounded-full font-medium tracking-wide shadow-[0_0_15px_rgba(220,38,38,0.1)]">Chrysler</span>
              <span className="bg-concept-red/10 border border-concept-red/30 text-white px-6 py-2.5 rounded-full font-medium tracking-wide shadow-[0_0_15px_rgba(220,38,38,0.1)]">Dodge</span>
              <span className="bg-concept-red/10 border border-concept-red/30 text-white px-6 py-2.5 rounded-full font-medium tracking-wide shadow-[0_0_15px_rgba(220,38,38,0.1)]">Jeep</span>
              <span className="bg-concept-red/10 border border-concept-red/30 text-white px-6 py-2.5 rounded-full font-medium tracking-wide shadow-[0_0_15px_rgba(220,38,38,0.1)]">Fiat</span>
              <span className="bg-concept-red/10 border border-concept-red/30 text-white px-6 py-2.5 rounded-full font-medium tracking-wide shadow-[0_0_15px_rgba(220,38,38,0.1)]">Alfa Romeo</span>
            </div>
            <p className="text-slate-400 text-sm font-light">
              oraz inne marki amerykańskie jak <span className="text-white font-medium">Ford</span> i więcej
            </p>
          </div>
        </div>

        {/* Formy zakupu */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center mb-4 font-heading">
            <span className="text-concept-blue">Formy zakupu</span>
          </h3>
          <p className="text-center text-slate-400 mb-10 font-light">Kliknij, aby zobaczyć szczegóły</p>

          <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
            {/* Auto na gotowo */}
            <div className="flex flex-col">
              <div
                className={`flex flex-col items-center justify-center p-8 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-md ${expandedCard === 0
                    ? 'bg-concept-red/20 border-concept-red/50 shadow-[0_0_30px_rgba(220,38,38,0.2)] -translate-y-2'
                    : 'glass border-white/5 hover:bg-white/10 hover:-translate-y-1'
                  }`}
                onClick={() => toggleCard(0)}
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">🚗✨</div>
                <h4 className="text-lg font-bold text-white mb-2 tracking-wide">Auto na gotowo</h4>
                <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${expandedCard === 0 ? 'rotate-180' : ''}`} />
              </div>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCard === 0 ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-concept-red">
                  <h4 className="text-xl font-bold text-white mb-6 font-heading">Auto na gotowo</h4>
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
                className={`flex flex-col items-center justify-center p-8 rounded-2xl cursor-pointer transition-all duration-300 border backdrop-blur-md ${expandedCard === 1
                    ? 'bg-concept-blue/20 border-concept-blue/50 shadow-[0_0_30px_rgba(59,130,246,0.2)] -translate-y-2'
                    : 'glass border-white/5 hover:bg-white/10 hover:-translate-y-1'
                  }`}
                onClick={() => toggleCard(1)}
              >
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">🚚💰</div>
                <h4 className="text-lg font-bold text-white mb-2 tracking-wide">Samochód pod dom</h4>
                <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${expandedCard === 1 ? 'rotate-180' : ''}`} />
              </div>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedCard === 1 ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="glass-panel p-8 rounded-2xl border-l-4 border-l-concept-blue">
                  <h4 className="text-xl font-bold text-white mb-6 font-heading">Samochód pod dom</h4>
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
        <div className="mt-24 glass-panel border-t-2 border-t-teal-500 rounded-3xl p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent pointer-events-none"></div>
          <h3 className="text-2xl md:text-3xl font-bold mb-12 font-heading tracking-wide text-white">
            <span className="mr-3">💼</span> Profesjonalna obsługa finansowa i logistyczna
          </h3>

          <div className="grid md:grid-cols-3 gap-10 text-left max-w-6xl mx-auto relative z-10">
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="bg-teal-500/20 text-teal-400 rounded-2xl p-4 border border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3 text-white tracking-wide">Pełna faktura VAT</h4>
                <p className="text-slate-400 font-light text-sm leading-relaxed">Na każdy sprzedany samochód wystawiamy pełną fakturę VAT. Działamy w pełni legalnie i transparentnie.</p>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="bg-teal-500/20 text-teal-400 rounded-2xl p-4 border border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3 text-white tracking-wide">Kredyty i leasingi</h4>
                <p className="text-slate-400 font-light text-sm leading-relaxed">Oferujemy możliwość finansowania zakupu poprzez kredyt lub leasing. Pomożemy dobrać najlepszą opcję!</p>
              </div>
            </div>
            <div className="flex items-start space-x-5">
              <div className="flex-shrink-0">
                <div className="bg-teal-500/20 text-teal-400 rounded-2xl p-4 border border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.15)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-3 text-white tracking-wide">Port Gdynia</h4>
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
