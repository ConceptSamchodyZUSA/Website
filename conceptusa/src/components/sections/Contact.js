import React from 'react';
import { Phone, Mail, Facebook, Instagram, ChevronRight } from 'lucide-react';

const Contact = ({ isVisible }) => {
  return (
    <section id="contact" className={`py-24 bg-concept-gray relative z-10 ${isVisible ? 'visible' : ''}`}>
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 divider-shimmer"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 font-heading tracking-wider">
          <span className="text-concept-red">Skontaktuj się</span> z nami
        </h2>
        <p className="text-center text-slate-400 mb-16 text-lg font-light tracking-wide font-accent">
          Odpowiadamy w ciągu 24h!
        </p>

        {/* Main contact cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Phone - Primary */}
          <a
            href="tel:+48691795116"
            className="group relative overflow-hidden card-matte p-8 rounded-xl text-center hover:-translate-y-2 transition-all duration-300 hover:border-concept-red/30 hover:shadow-[0_0_30px_rgba(227,24,55,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-concept-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="w-20 h-20 mx-auto mb-6 bg-concept-red/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-concept-red/20 text-concept-red">
              <Phone size={36} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white font-heading tracking-wider">Zadzwoń</h3>
            <p className="text-white text-lg font-accent font-medium tracking-wider mb-2">+48 691 795 116</p>
            <p className="text-slate-400 text-sm font-light font-accent">Pon-Pt: 9:00-17:00</p>
          </a>

          {/* Email */}
          <a
            href="mailto:conceptusacars@gmail.com"
            className="group relative overflow-hidden card-matte p-8 rounded-xl text-center hover:-translate-y-2 transition-all duration-300 hover:border-concept-blue/30 hover:shadow-[0_0_30px_rgba(91,123,154,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-concept-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="w-20 h-20 mx-auto mb-6 bg-concept-blue/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-concept-blue/20 text-concept-blue">
              <Mail size={36} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white font-heading tracking-wider">Email</h3>
            <p className="text-white font-accent font-medium mb-2 text-base">conceptusacars@gmail.com</p>
            <p className="text-slate-400 text-sm font-light font-accent">Odpisujemy w 24h</p>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com/conceptsamochodyzusa"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden card-matte p-8 rounded-xl text-center hover:-translate-y-2 transition-all duration-300 hover:border-[#1877F2]/30 hover:shadow-[0_0_30px_rgba(24,119,242,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1877F2]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="w-20 h-20 mx-auto mb-6 bg-[#1877F2]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#1877F2]/20 text-[#1877F2]">
              <Facebook size={36} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white font-heading tracking-wider">Facebook</h3>
            <p className="text-white font-accent font-medium mb-2">conceptsamochodyzusa</p>
            <p className="text-slate-400 text-sm font-light font-accent">Napisz wiadomość</p>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/concept_samochody_z_usa"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden card-matte p-8 rounded-xl text-center hover:-translate-y-2 transition-all duration-300 hover:border-[#E1306C]/30 hover:shadow-[0_0_30px_rgba(225,48,108,0.15)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#E1306C]/10 to-[#FD1D1D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F56040]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-[#E1306C]/20 text-[#E1306C]">
              <Instagram size={36} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white font-heading tracking-wider">Instagram</h3>
            <p className="text-white font-accent font-medium mb-2">@concept_samochody_z...</p>
            <p className="text-slate-400 text-sm font-light font-accent">Śledź nasze realizacje</p>
          </a>
        </div>

        {/* Google Maps */}
        <div className="card-matte p-6 md:p-8 rounded-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2 font-heading tracking-wider text-white">Nasza lokalizacja</h3>
              <p className="text-slate-400 font-light font-accent">ul. Długa 24, 84-230 Dębogórze-Wybudowanie</p>
            </div>
            <a
              href="https://maps.app.goo.gl/Cjt7ecape4DMaosh8"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 md:mt-0 inline-flex items-center gap-3 bg-white/5 hover:bg-concept-red border border-white/10 hover:border-concept-red text-white font-accent font-medium tracking-wide px-6 py-3.5 rounded-xl transition-all duration-300 group hover:shadow-[0_0_20px_rgba(227,24,55,0.4)]"
            >
              <span>Otwórz w Google Maps</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="aspect-[21/9] w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2351.234567!2d18.1234567!3d54.1234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd09e3c3e0b0b9%3A0x1234567890abcdef!2zRMWCdWdhIDI0LCA4NC0yMzAgRMSZYm9nw7NyemUtV3lidWRvd2FuaWU!5e0!3m2!1spl!2spl!4v1234567890123!5m2!1spl!2spl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa lokalizacji CONCEPT Samochody z USA - Długa 24, Dębogórze-Wybudowanie"
              className="filter grayscale-[20%] contrast-125 hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
