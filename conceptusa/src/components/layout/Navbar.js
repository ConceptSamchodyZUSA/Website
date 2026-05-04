import React from 'react';
import { Menu, X, ChevronRight, Phone, Facebook, Instagram } from 'lucide-react';

const Navbar = ({ isScrolled, isMenuOpen, setIsMenuOpen, scrollToSection }) => {
  return (
    <>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-dark !border-0' : 'bg-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
              {/* New Emblem Logo */}
              <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-105">
                <div className={`relative flex items-center justify-center bg-gradient-to-br from-concept-red to-red-900 border-2 border-red-500 transform -skew-x-12 shadow-[0_0_15px_rgba(255,26,26,0.6)] ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
                  <span className={`relative z-10 text-white font-black italic tracking-tighter transform skew-x-12 ${isScrolled ? 'text-lg' : 'text-xl'}`}>C</span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className={`font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 tracking-tighter leading-none ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
                    CONCEPT
                  </span>
                  <span className={`text-concept-red font-bold tracking-[0.3em] uppercase leading-none mt-0.5 ${isScrolled ? 'text-[0.5rem]' : 'text-[0.6rem]'}`}>
                    USA IMPORTS
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Start' },
                { id: 'about', label: 'O nas' },
                { id: 'process', label: 'Jak to działa' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'order', label: 'Zamów auto' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-2 py-2 text-sm font-medium tracking-wide text-slate-300 transition-colors duration-300 group hover:text-white hover:bg-transparent border-0"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-concept-red transition-all duration-300 group-hover:w-full" />
                </button>
              ))}

              {/* Contact button */}
              <button
                onClick={() => scrollToSection('contact')}
                className="group skew-btn px-6 py-2 bg-concept-red transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,26,26,0.8)] border border-red-500/50"
              >
                <span className="skew-content flex items-center gap-2 font-bold text-white uppercase tracking-wider text-xs">
                  <Phone size={14} />
                  Kontakt
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-200 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[100] transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
          }`}
      >
        <div className="absolute inset-0 bg-concept-dark/95 backdrop-blur-xl" />

        <div className={`relative h-full flex flex-col transition-all duration-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}>
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/5">
            {/* New Emblem Logo Mobile */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-8 h-8 bg-gradient-to-br from-concept-red to-red-900 border-2 border-red-500 transform -skew-x-12 shadow-[0_0_10px_rgba(255,26,26,0.6)]">
                <span className="relative z-10 text-white font-black text-lg italic tracking-tighter transform skew-x-12">C</span>
              </div>
              <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 tracking-tighter">
                CONCEPT
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-concept-red text-white rounded-full transition-all duration-300"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex-1 flex flex-col justify-center px-6 space-y-4">
            {[
              { id: 'home', label: 'Start' },
              { id: 'about', label: 'O nas' },
              { id: 'process', label: 'Jak to działa' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'order', label: 'Zamów auto' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMenuOpen(false);
                }}
                className="group flex items-center gap-4 py-4 px-6 text-xl font-medium rounded-xl transition-all duration-300 border border-transparent bg-white/5 hover:bg-white/10"
              >
                <span className="text-slate-300 group-hover:text-white">{item.label}</span>
                <ChevronRight size={20} className="ml-auto opacity-0 group-hover:opacity-100 transition-all text-concept-red duration-300 group-hover:translate-x-1" />
              </button>
            ))}

            <button
              onClick={() => {
                scrollToSection('contact');
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-center gap-3 py-5 px-6 mt-4 text-xl font-bold bg-concept-red hover:bg-concept-red-dark text-white rounded-xl shadow-lg shadow-concept-red/20 transition-all duration-300"
            >
              <Phone size={24} />
              <span>Kontakt</span>
            </button>
          </div>

          {/* Footer with social links */}
          <div className="p-6 border-t border-white/5">
            <div className="flex justify-center gap-6">
              <a href="https://www.facebook.com/conceptsamochodyzusa" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Facebook size={28} />
              </a>
              <a href="https://www.instagram.com/concept_samochody_z_usa" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={28} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
