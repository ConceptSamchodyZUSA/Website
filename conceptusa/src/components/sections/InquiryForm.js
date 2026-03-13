import React from 'react';
import { Loader2 } from 'lucide-react';

const InquiryForm = ({ isVisible, formData, handleInputChange, handleSubmit, submittingForm }) => {
  return (
    <section id="order" className={`py-24 bg-concept-dark relative z-10 ${isVisible ? 'visible' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/[0.02] to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 font-heading">
          Zamów <span className="text-concept-red">swoje auto</span>
        </h2>
        <p className="text-center text-slate-400 mb-16 text-lg font-light tracking-wide">
          Powiedz nam czego szukasz, a my znajdziemy idealne auto dla Ciebie
        </p>

        <div className="glass-panel p-8 md:p-12 rounded-3xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">Imię i nazwisko *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-concept-red/50 focus:border-concept-red transition-all font-light"
                placeholder="Jan Kowalski"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-concept-red/50 focus:border-concept-red transition-all font-light"
                placeholder="jan@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">Telefon *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-concept-red/50 focus:border-concept-red transition-all font-light"
              placeholder="+48 691 795 116"
              required
            />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">Marka</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-concept-red/50 focus:border-concept-red transition-all font-light"
                placeholder="np. Dodge, Jeep"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">Model (opcjonalnie)</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-concept-red/50 focus:border-concept-red transition-all font-light"
                placeholder="np. Challenger"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">Budżet (PLN)</label>
              <input
                type="number"
                inputMode="numeric"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-concept-red/50 focus:border-concept-red transition-all font-light"
                placeholder="150000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">Rok produkcji</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-concept-red/50 focus:border-concept-red transition-all font-light"
                placeholder="2020-2024"
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-300 mb-2 tracking-wide">Dodatkowe informacje</label>
            <textarea
              rows={4}
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-concept-red/50 focus:border-concept-red transition-all font-light resize-none"
              placeholder="Opisz swoje preferencje, wymagania dotyczące pojazdu..."
            ></textarea>
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
            className={`w-full bg-concept-red hover:bg-concept-red-dark text-white py-4 bg-gradient-to-r from-concept-red to-concept-red/80 rounded-xl text-lg font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${submittingForm ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:-translate-y-1'}`}
          >
            {submittingForm ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                <span>Wysyłanie...</span>
              </>
            ) : (
              <span>Wyślij zapytanie</span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
