import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const VehicleProcess = ({ isVisible }) => {
  const [processType, setProcessType] = useState('ready');

  return (
    <section id="process" className={`py-24 bg-concept-dark relative overflow-hidden ${isVisible ? 'visible' : ''}`}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 divider-shimmer"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-concept-red/[0.02] to-transparent pointer-events-none"></div>

      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-concept-gold/8 rounded-full mix-blend-screen filter blur-[120px] opacity-50 pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 -left-48 w-[500px] h-[500px] bg-concept-red/8 rounded-full mix-blend-screen filter blur-[120px] opacity-50 pointer-events-none animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 font-heading tracking-wider">
          Jak to <span className="text-concept-red">działa</span>?
        </h2>
        <p className="text-center text-slate-400 mb-16 text-lg font-light tracking-wide font-accent">
          Wybierz opcję, która Cię interesuje
        </p>

        {/* Toggle Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
          <button
            onClick={() => setProcessType('ready')}
            className={`relative px-10 py-5 rounded-2xl font-bold tracking-widest text-sm transition-all duration-500 overflow-hidden group font-accent ${processType === 'ready'
              ? 'bg-gradient-to-br from-teal-900/40 to-teal-800/20 text-white shadow-[0_0_40px_rgba(20,184,166,0.3)]'
              : 'glass border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
          >
            {processType === 'ready' && (
              <div className="absolute inset-0 border-2 border-transparent rounded-2xl [background:linear-gradient(theme(colors.teal.400),theme(colors.teal.600))_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] mask-composite-exclude opacity-70 animate-pulse-slow"></div>
            )}
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-3 text-xl group-hover:scale-110 transition-transform">🚗</span> AUTO NA GOTOWO
            </span>
          </button>
          <button
            onClick={() => setProcessType('custom')}
            className={`relative px-10 py-5 rounded-2xl font-bold tracking-widest text-sm transition-all duration-500 overflow-hidden group font-accent ${processType === 'custom'
              ? 'bg-gradient-to-br from-concept-blue/40 to-concept-blue-dark/20 text-white shadow-[0_0_40px_rgba(91,123,154,0.3)]'
              : 'glass border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
          >
            {processType === 'custom' && (
              <div className="absolute inset-0 border-2 border-transparent rounded-2xl [background:linear-gradient(theme(colors.blue.400),theme(colors.blue.600))_border-box] [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)] mask-composite-exclude opacity-70 animate-pulse-slow"></div>
            )}
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-3 text-xl group-hover:scale-110 transition-transform">🎯</span> AUTO POD DOM
            </span>
          </button>
        </div>

        {/* Process Steps - Auto na gotowo */}
        {processType === 'ready' && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4 animate-fade-in-up">
            {[
              { num: '01', title: 'Zakup w USA', desc: 'Aukcje w USA', icon: '🇺🇸' },
              { num: '02', title: 'Transport', desc: 'Port Gdynia', icon: '🚢' },
              { num: '03', title: 'Odprawa celna', desc: 'W Gdyni', icon: '📋' },
              { num: '04', title: 'Naprawa', desc: 'Pełny serwis', icon: '🔨' },
              { num: '05', title: 'Rejestracja', desc: 'W Polsce', icon: '📝' },
              { num: '06', title: 'Odbiór', desc: 'Gotowe z kluczykiem', icon: '🎉' }
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="card-matte p-6 rounded-xl text-center hover:border-teal-500/20 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col justify-center">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                  <div className="text-xs font-bold font-accent text-teal-500/70 mb-2 tracking-widest">{step.num}</div>
                  <h3 className="text-sm font-bold text-white mb-2 font-heading tracking-wider">{step.title}</h3>
                  <p className="text-xs text-slate-400 font-light font-accent">{step.desc}</p>
                </div>
                {idx < 5 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 w-6 h-6 items-center justify-center">
                    <ChevronDown className="rotate-[-90deg] text-teal-500/50" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Process Steps - Auto pod dom */}
        {processType === 'custom' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up">
            {[
              { num: '01', title: 'Kontakt', desc: 'Powiedz czego szukasz', icon: '💬' },
              { num: '02', title: 'Wyszukiwanie i zakup', desc: 'Kupujemy auto w USA', icon: '🔎' },
              { num: '03', title: 'Transport i odprawa', desc: 'Odprawa celna w Gdyni', icon: '🚢' },
              { num: '04', title: 'Odbiór', desc: 'Odbierasz auto, ty naprawiasz', icon: '🎊' }
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="card-matte p-8 rounded-xl text-center hover:border-concept-blue/20 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col justify-center">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
                  <div className="text-xs font-bold font-accent text-concept-blue/70 mb-3 tracking-widest">{step.num}</div>
                  <h3 className="text-base font-bold text-white mb-3 font-heading tracking-wider">{step.title}</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed font-accent">{step.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 w-8 h-8 items-center justify-center">
                    <ChevronDown className="rotate-[-90deg] text-concept-blue/50" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className={`mt-16 card-matte p-8 md:p-10 rounded-xl text-center max-w-4xl mx-auto transition-all duration-500 ${processType === 'ready'
          ? 'border-l-4 border-l-teal-500'
          : 'border-l-4 border-l-concept-blue'
          }`}>
          {processType === 'ready' ? (
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              <span className="text-teal-400 font-semibold tracking-wide mr-2 uppercase text-sm font-accent">Pełna obsługa</span>
              <br className="md:hidden" />
              Wszystko robimy my - od zakupu w USA, przez naprawę i rejestrację. Auto gotowe do jazdy od pierwszego dnia!
            </p>
          ) : (
            <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
              <span className="text-concept-blue font-semibold tracking-wide mr-2 uppercase text-sm font-accent">Niższa cena</span>
              <br className="md:hidden" />
              Zajmujemy się zakupem, transportem i odprawą celną. Ty sam decydujesz o naprawie i rejestracji - pełna kontrola kosztów.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default VehicleProcess;
