import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-concept-dark py-16 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6 font-heading tracking-widest uppercase">
              CONCEPT <span className="text-concept-red">.</span>
            </h3>
            <div className="space-y-3 text-slate-400 text-sm font-light leading-relaxed">
              <p className="font-medium text-slate-300 text-base">Concept Łukasz Grzenkowski</p>
              <p>ul. Długa 24</p>
              <p>84-230 Dębogórze-Wybudowanie</p>
              <p className="mt-6">NIP: 5881948634</p>
              <p>REGON: 383279264</p>
            </div>
            <div className="mt-8 flex gap-4">
              <a href="https://facebook.com/conceptsamochodyzusa" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full hover:bg-concept-blue text-slate-400 hover:text-white transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/concept_samochody_z_usa" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-3 rounded-full hover:bg-pink-600 text-slate-400 hover:text-white transition-all duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 tracking-wide">Szybki kontakt</h3>
            <div className="space-y-4 text-slate-400 text-sm font-light">
              <a href="tel:+48691795116" className="group flex items-center gap-3 hover:text-white transition-colors">
                <span className="text-concept-red group-hover:scale-110 transition-transform">📞</span>
                <span className="tracking-wider">+48 691 795 116</span>
              </a>
              <a href="mailto:conceptusacars@gmail.com" className="group flex items-center gap-3 hover:text-white transition-colors">
                <span className="text-concept-blue group-hover:scale-110 transition-transform">✉️</span>
                <span>conceptusacars@gmail.com</span>
              </a>
              <div className="pt-6 mt-6 border-t border-white/5">
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Godziny otwarcia</p>
                <p>Poniedziałek - Piątek</p>
                <p className="font-medium text-slate-300 mt-1">09:00 - 17:00</p>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 tracking-wide">Informacje prawne</h3>
            <div className="space-y-4 text-slate-400 text-sm font-light flex flex-col items-start">
              <a href="/terms-of-service" className="hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5">
                Regulamin świadczenia usług
              </a>
              <a href="/privacy-policy" className="hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5">
                Polityka Prywatności
              </a>
              <button onClick={() => window.openCookieSettings && window.openCookieSettings()} className="hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5">
                Ustawienia Cookies
              </button>
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors border-b border-transparent hover:border-white/30 pb-0.5 mt-2 flex items-center gap-2">
                <span>🇪🇺</span> Platforma ODR
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-slate-500 text-sm font-light">
            &copy; {new Date().getFullYear()} CONCEPT - Samochody z USA. Wszystkie prawa zastrzeżone.
          </p>
          <p className="text-slate-600 text-xs font-light tracking-wide order-first md:order-last">
            built by <a href="https://github.com/Kobeep" target="_blank" rel="noopener noreferrer" className="text-concept-blue hover:text-blue-400 font-medium ml-1">Kobeep</a> (Jakub Pospieszny)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
