import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useCountUp } from '../../hooks/useAnimations';

const backgroundImageFallback = '/background.jpg';

const Hero = ({ isVisible, scrollToSection }) => {
  const { ref: carsCountRef, count: carsCount } = useCountUp(2000, 2200);
  const { ref: safetyCountRef, count: safetyCount } = useCountUp(100, 1800);

  return (
    <section id="home" className={`relative h-screen flex items-center justify-center overflow-hidden ${isVisible ? 'visible' : ''}`}>
      {/* Deep dark base */}
      <div className="absolute inset-0 bg-concept-dark/70 z-0"></div>

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-concept-red/15 rounded-full mix-blend-screen filter blur-[128px] opacity-60 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-concept-red-light/8 rounded-full mix-blend-screen filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-purple-500/8 rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-blob animation-delay-4000"></div>

      {/* Background image */}
      <div className="absolute inset-0 opacity-50 mix-blend-overlay">
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

      {/* Noise texture overlay for cinematic grain */}
      <div className="noise-overlay absolute inset-0 z-[1]"></div>

      {/* Floating Badges */}
      <div className="absolute top-1/4 right-[10%] lg:right-[15%] hidden md:block animate-float z-20">
        <div className="glass-panel px-6 py-4 rounded-2xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-concept-red to-concept-red-dark flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(227,24,55,0.5)] font-accent" ref={carsCountRef}>
            +{carsCount}
          </div>
          <div>
            <p className="text-white font-bold tracking-wide font-accent">Sprowadzonych</p>
            <p className="text-concept-slate text-sm font-accent">pojazdów z USA</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/3 left-[10%] lg:left-[15%] hidden md:block animate-float-delayed z-20">
        <div className="glass-panel px-6 py-4 rounded-2xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-concept-gold/80 to-concept-gold/40 flex items-center justify-center text-concept-dark font-bold text-sm shadow-[0_0_20px_rgba(212,168,83,0.4)] font-accent" ref={safetyCountRef}>
            {safetyCount}%
          </div>
          <div>
            <p className="text-white font-bold tracking-wide font-accent">Bezpieczeństwo</p>
            <p className="text-concept-slate text-sm font-accent">Pełna dokumentacja</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pb-16">
        <h1 className="mb-3 leading-none opacity-0 animate-fade-in-up">
          {/* Spectacular glowing logo with decorative flanks */}
          <div className="relative inline-flex items-center gap-3 md:gap-5 mb-2">
            {/* Left decorative elements */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-concept-red/50 shadow-[0_0_8px_rgba(227,24,55,0.3)]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-concept-red/80 shadow-[0_0_6px_rgba(227,24,55,0.6)]"></div>
            </div>

            {/* CONCEPT — spectacular glow effect */}
            <div className="relative">
              <span className="text-glow text-6xl md:text-7xl lg:text-[9rem] font-heading tracking-[0.1em] leading-none">
                CONCEPT
              </span>
              {/* Ambient glow behind text */}
              <div className="absolute inset-0 bg-concept-red/10 blur-[60px] rounded-full -z-10 animate-pulse-slow"></div>
              <div className="absolute inset-0 bg-concept-red/5 blur-[100px] rounded-full -z-20 scale-150"></div>
            </div>

            {/* Right decorative elements */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-concept-red/80 shadow-[0_0_6px_rgba(227,24,55,0.6)]"></div>
              <div className="w-8 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-concept-red/50 shadow-[0_0_8px_rgba(227,24,55,0.3)]"></div>
            </div>
          </div>
          <br />
          <div className="relative inline-block mt-1">
            <span className="text-white/60 text-xl md:text-2xl lg:text-3xl tracking-[0.3em] font-accent font-light uppercase">
              Samochody z USA
            </span>
          </div>
        </h1>

        <p className="text-sm md:text-base mb-6 text-slate-300/80 font-light max-w-2xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
          Premium import amerykańskiej motoryzacji. Dostarczamy emocje prosto do Twojego garażu.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          <button
            onClick={() => scrollToSection('portfolio')}
            className="group relative overflow-hidden glass rounded-full px-6 py-3 transition-all duration-500 hover:bg-white/10 border-white/20 hover:border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-0 w-1/2 h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative text-sm font-medium text-white tracking-[0.2em] uppercase font-accent">
              Zobacz portfolio
            </span>
          </button>

          <button
            onClick={() => scrollToSection('order')}
            className="group relative overflow-hidden px-6 py-3 rounded-full text-sm font-bold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-concept-red to-concept-red-dark transition-all duration-500 hover:shadow-[0_0_30px_rgba(227,24,55,0.6)] hover:-translate-y-1 border border-concept-red/50 font-accent"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan"></div>
            <span className="relative z-10 flex items-center gap-3">
              Zamów auto
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </button>
        </div>
      </div>

      {/* Odkryj arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 opacity-60 hover:opacity-100 cursor-pointer hover:text-white transition-all duration-300 z-30" onClick={() => scrollToSection('about')}>
        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase font-accent">Odkryj</span>
        <ChevronDown className="animate-bounce mt-1 text-concept-red" size={20} />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-concept-dark to-transparent z-[5]"></div>
    </section>
  );
};

export default Hero;
