import React from 'react';
import { Loader2 } from 'lucide-react';

const InquiryForm = ({ isVisible, formData, handleInputChange, handleSubmit, submittingForm }) => {
  return (
    <section id="order" className={`py-24 bg-concept-dark relative z-10 ${isVisible ? 'visible' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-concept-red/[0.02] to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-heading tracking-wide">
          Zamów <span className="text-transparent bg-clip-text bg-gradient-to-r from-concept-red to-concept-blue animate-gradient-x">swoje auto</span>
        </h2>
        <p className="text-center text-slate-400 mb-16 text-lg font-light tracking-wide max-w-2xl mx-auto">
          Powiedz nam czego szukasz, a my znajdziemy idealne auto dla Ciebie. Importujemy marzenia, dostarczamy gotowe emocje.
        </p>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-0 glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">

          {/* Left Side: Contact Info & Storytelling */}
          <div className="lg:w-2/5 p-10 md:p-14 bg-gradient-to-br from-concept-dark/80 to-concept-dark flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-concept-red/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-concept-red/20 transition-colors duration-700"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-concept-blue/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 group-hover:bg-concept-blue/20 transition-colors duration-700"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-6 font-heading tracking-widest uppercase">
                Zacznijmy <br /><span className="text-concept-red">rozmowę.</span>
              </h3>
              <p className="text-slate-400 font-light leading-relaxed mb-12">
                Wypełnij formularz, aby rozpocząć proces importu. Nasz ekspert skontaktuje się z Tobą w ciągu 24 godzin z wyselekcjonowanymi propozycjami aut dopasowanych do Twoich potrzeb i budżetu.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group/item">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-concept-red group-hover/item:scale-110 group-hover/item:bg-concept-red/20 border border-white/5 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-medium mb-1">Telefon</p>
                    <a href="tel:+48691795116" className="text-white hover:text-concept-red transition-colors text-lg tracking-wide">+48 691 795 116</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group/item">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-concept-blue group-hover/item:scale-110 group-hover/item:bg-concept-blue/20 border border-white/5 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase tracking-widest font-medium mb-1">Email</p>
                    <a href="mailto:conceptusacars@gmail.com" className="text-white hover:text-concept-blue transition-colors text-lg tracking-wide">conceptusacars@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Configuration Form */}
          <div className="lg:w-3/5 p-10 md:p-14 bg-white/[0.02]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-concept-red transition-colors font-light placeholder-transparent"
                  placeholder="Imię i nazwisko"
                  required
                />
                <label htmlFor="name" className="absolute left-0 -top-3.5 text-concept-red text-xs font-light transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-concept-red peer-focus:text-xs">
                  Imię i nazwisko *
                </label>
              </div>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-concept-blue transition-colors font-light placeholder-transparent"
                  placeholder="Email"
                  required
                />
                <label htmlFor="email" className="absolute left-0 -top-3.5 text-concept-blue text-xs font-light transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-concept-blue peer-focus:text-xs">
                  Email *
                </label>
              </div>
            </div>

            <div className="relative group mb-8">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-concept-red transition-colors font-light placeholder-transparent"
                placeholder="Telefon"
                required
              />
              <label htmlFor="phone" className="absolute left-0 -top-3.5 text-concept-red text-xs font-light transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-concept-red peer-focus:text-xs">
                Telefon *
              </label>
            </div>

            {/* Honeypot field - invisible to users, catches bots */}
            <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6 mt-6">
              <div className="relative group">
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-concept-blue transition-colors font-light placeholder-transparent"
                  placeholder="Marka"
                />
                <label htmlFor="brand" className="absolute left-0 -top-3.5 text-concept-blue text-xs font-light transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-concept-blue peer-focus:text-xs">
                  Marka (np. Dodge)
                </label>
              </div>
              <div className="relative group">
                <input
                  type="text"
                  name="model"
                  id="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-concept-red transition-colors font-light placeholder-transparent"
                  placeholder="Model"
                />
                <label htmlFor="model" className="absolute left-0 -top-3.5 text-concept-red text-xs font-light transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-concept-red peer-focus:text-xs">
                  Model (np. Challenger)
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-10">
              <div className="relative group">
                <input
                  type="number"
                  inputMode="numeric"
                  name="budget"
                  id="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-concept-red transition-colors font-light placeholder-transparent"
                  placeholder="Budżet"
                />
                <label htmlFor="budget" className="absolute left-0 -top-3.5 text-concept-red text-xs font-light transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-concept-red peer-focus:text-xs">
                  Budżet (PLN)
                </label>
              </div>
              <div className="relative group">
                <input
                  type="text"
                  name="year"
                  id="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-concept-blue transition-colors font-light placeholder-transparent"
                  placeholder="Rok produkcji"
                />
                <label htmlFor="year" className="absolute left-0 -top-3.5 text-concept-blue text-xs font-light transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-concept-blue peer-focus:text-xs">
                  Rok produkcji
                </label>
              </div>
            </div>

            <div className="relative group mb-8">
              <textarea
                rows={3}
                name="message"
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                className="peer w-full bg-transparent border-b-2 border-white/10 px-0 py-3 text-white focus:outline-none focus:border-concept-red transition-colors font-light placeholder-transparent resize-none"
                placeholder="Wiadomość"
              ></textarea>
              <label htmlFor="message" className="absolute left-0 -top-3.5 text-concept-red text-xs font-light transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-concept-red peer-focus:text-xs">
                Dodatkowe informacje, pytania...
              </label>
            </div>

            {/* RODO Consent */}
            <div className="mb-8 bg-white/5 p-5 rounded-xl border border-white/10 flex gap-4">
              <input
                type="checkbox"
                name="rodoConsent"
                checked={formData.rodoConsent || false}
                onChange={handleInputChange}
                className="mt-1 w-5 h-5 accent-concept-red cursor-pointer flex-shrink-0"
                required
              />
              <label className="text-xs text-slate-400 font-light leading-relaxed cursor-pointer" onClick={() => handleInputChange({ target: { name: 'rodoConsent', type: 'checkbox', checked: !formData.rodoConsent } })}>
                Wyrażam zgodę na przetwarzanie moich danych osobowych przez{' '}
                <strong className="text-slate-300 font-medium">Concept Łukasz Grzenkowski</strong> w celu kontaktu
                i prezentacji oferty importu samochodów z USA. Administratorem danych jest Concept Łukasz Grzenkowski. Więcej informacji w{' '}
                <a href="/privacy-policy" target="_blank" className="text-concept-blue hover:text-blue-400 transition-colors">
                  Polityce Prywatności
                </a>.
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={submittingForm}
              className={`relative w-full overflow-hidden group py-4 rounded-xl text-lg font-bold tracking-widest uppercase text-white bg-gradient-to-r from-concept-red to-red-700 transition-all duration-500 border border-red-500/50 flex items-center justify-center gap-3 ${submittingForm ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:-translate-y-1'}`}
            >
              {!submittingForm && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan"></div>
              )}
              <span className="relative z-10 flex items-center gap-3">
                {submittingForm ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Wysyłanie...
                  </>
                ) : (
                  <>
                    Wyślij zapytanie
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
