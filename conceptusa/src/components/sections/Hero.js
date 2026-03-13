import React from 'react';
import { ChevronDown } from 'lucide-react';

const backgroundImageFallback = '/background.jpg';

const Hero = ({ isVisible, scrollToSection }) => {
  return (
    <section id="home" className={`relative h-screen flex items-center justify-center overflow-hidden ${isVisible ? 'visible' : ''}`}>
      <div className="absolute inset-0 bg-concept-dark/80 z-0"></div>

      {/* Colorful, floating ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-concept-red/20 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-concept-blue/20 rounded-full mix-blend-screen filter blur-[128px] opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-purple-500/10 rounded-full mix-blend-screen filter blur-[150px] opacity-60 animate-blob animation-delay-4000"></div>

      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        <picture>
          <source
            srcSet="/optimized-images/background-400w.webp 400w,
                    /optimized-images/background-800w.webp 800w,
                    /optimized-images/background-1200w.webp 1200w"
            sizes="100vw"
            type="image/webp"
          />
          <img
            src={backgroundImageFallback}
            alt="Import samochodów z USA - Muscle cars, pickupy i SUVy"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </picture>
      </div>

      {/* Floating Badges */}
      <div className="absolute top-1/4 right-[10%] lg:right-[15%] hidden md:block animate-float z-20">
        <div className="glass-panel px-6 py-4 rounded-2xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 backdrop-blur-xl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-concept-red to-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            +100
          </div>
          <div>
            <p className="text-white font-bold tracking-wide">Sprowadzonych</p>
            <p className="text-concept-slate text-sm">pojazdów z USA</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/3 left-[10%] lg:left-[15%] hidden md:block animate-float-delayed z-20">
        <div className="glass-panel px-6 py-4 rounded-2xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 backdrop-blur-xl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-concept-blue to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            100%
          </div>
          <div>
            <p className="text-white font-bold tracking-wide">Bezpieczeństwo</p>
            <p className="text-concept-slate text-sm">Pełna dokumentacja</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold mb-6 font-heading tracking-tight drop-shadow-2xl leading-none opacity-0 animate-fade-in-up">
          <div className="relative inline-block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-concept-red via-concept-blue to-concept-red animate-gradient-x drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]">
            CONCEPT
          </div>
          <br />
          <div className="relative inline-block mt-4">
            <span className="text-white text-4xl md:text-6xl lg:text-7xl tracking-wide font-sans font-light text-shadow-xl">
              Samochody z USA
            </span>
          </div>
        </h1>

        <p className="text-xl md:text-2xl mb-14 text-slate-300 font-light max-w-2xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
          Premium import amerykańskiej motoryzacji. Dostarczamy emocje prosto do Twojego garażu.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          <button
            onClick={() => scrollToSection('portfolio')}
            className="group relative overflow-hidden glass rounded-full px-10 py-5 transition-all duration-500 hover:bg-white/10 border-white/20 hover:border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-0 w-1/2 h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative text-lg font-medium text-white tracking-widest uppercase">
              Zobacz portfolio
            </span>
          </button>

          <button
            onClick={() => scrollToSection('order')}
            className="group relative overflow-hidden px-10 py-5 rounded-full text-lg font-bold tracking-widest uppercase text-white bg-gradient-to-r from-concept-red to-red-700 transition-all duration-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:-translate-y-1 border border-red-500/50"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan"></div>
            <span className="relative z-10 flex items-center gap-3">
              Zamów auto
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </button>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 opacity-60 hover:opacity-100 cursor-pointer hover:text-white transition-all duration-300" onClick={() => scrollToSection('about')}>
          <span className="text-xs font-bold tracking-[0.3em] uppercase">Odkryj</span>
          <ChevronDown className="animate-bounce mt-1 text-concept-red" size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
