import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useCountUp } from '../../hooks/useAnimations';

const backgroundImageFallback = '/background.jpg';

const Hero = ({ isVisible, scrollToSection }) => {
  const { ref: carsCountRef, count: carsCount } = useCountUp(2000, 2200);
  const { ref: safetyCountRef, count: safetyCount } = useCountUp(100, 1800);

  return (
    <section id="home" className={`relative h-screen flex items-center justify-center overflow-hidden ${isVisible ? 'visible' : ''}`}>
      {/* Deep dark overlay */}
      <div className="absolute inset-0 bg-concept-dark/70 z-0"></div>

      {/* Subtle ambient glows — red dominant, no blue */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-concept-red/15 rounded-full mix-blend-screen filter blur-[128px] opacity-60 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-concept-gold/8 rounded-full mix-blend-screen filter blur-[128px] opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] bg-concept-red-dark/10 rounded-full mix-blend-screen filter blur-[150px] opacity-50 animate-blob animation-delay-4000"></div>

      {/* Background image — more visible */}
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

      {/* Speed line accent — horizontal */}
      <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-concept-red/20 to-transparent z-[2]"></div>
      <div className="absolute top-[30.3%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-concept-red/10 to-transparent z-[2]"></div>

      {/* HUD-style Floating Badges */}
      <div className="absolute top-1/4 right-[10%] lg:right-[15%] hidden md:block animate-float z-20">
        <div className="hud-panel px-6 py-4 rounded-lg flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-concept-red to-concept-red-dark flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(227,24,55,0.4)] font-accent" ref={carsCountRef}>
            +{carsCount}
          </div>
          <div>
            <p className="text-white font-bold tracking-wide text-sm font-accent uppercase">Sprowadzonych</p>
            <p className="text-concept-chrome/60 text-xs font-accent">pojazdów z USA</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/3 left-[10%] lg:left-[15%] hidden md:block animate-float-delayed z-20">
        <div className="hud-panel px-6 py-4 rounded-lg flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-concept-gold/80 to-concept-gold/40 flex items-center justify-center text-concept-dark font-bold text-sm shadow-[0_0_20px_rgba(212,168,83,0.3)] font-accent" ref={safetyCountRef}>
            {safetyCount}%
          </div>
          <div>
            <p className="text-white font-bold tracking-wide text-sm font-accent uppercase">Bezpieczeństwo</p>
            <p className="text-concept-chrome/60 text-xs font-accent">Pełna dokumentacja</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pb-16">
        <h1 className="mb-3 leading-none opacity-0 animate-fade-in-up">
          {/* Premium logo with racing stripe flanks */}
          <div className="relative inline-flex items-center gap-4 md:gap-6 mb-2">
            {/* Left racing stripes */}
            <div className="hidden sm:flex items-center gap-1.5">
              <div className="w-8 md:w-20 h-[2px] bg-gradient-to-r from-transparent to-concept-red/70"></div>
              <div className="w-3 md:w-8 h-[2px] bg-gradient-to-r from-transparent to-concept-red/40"></div>
              <div className="w-2 h-2 rotate-45 bg-concept-gold/70"></div>
            </div>

            {/* CONCEPT — chrome metallic with massive Bebas Neue */}
            <div className="relative">
              <span className="text-chrome text-6xl md:text-7xl lg:text-[9rem] font-heading tracking-[0.15em] leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
                CONCEPT
              </span>
              {/* Red glow behind on hover */}
              <div className="absolute inset-0 bg-concept-red/5 blur-3xl rounded-full -z-10 animate-pulse-slow"></div>
            </div>

            {/* Right racing stripes */}
            <div className="hidden sm:flex items-center gap-1.5">
              <div className="w-2 h-2 rotate-45 bg-concept-gold/70"></div>
              <div className="w-3 md:w-8 h-[2px] bg-gradient-to-l from-transparent to-concept-red/40"></div>
              <div className="w-8 md:w-20 h-[2px] bg-gradient-to-l from-transparent to-concept-red/70"></div>
            </div>
          </div>
          <br />
          <div className="relative inline-block mt-1">
            <span className="text-concept-chrome/70 text-lg md:text-xl lg:text-2xl tracking-[0.4em] font-accent font-medium uppercase">
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
            className="group relative overflow-hidden glass rounded-lg px-6 py-3 transition-all duration-500 hover:bg-white/10 border-white/20 hover:border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            <div className="absolute inset-0 w-1/2 h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative text-sm font-medium text-white tracking-[0.2em] uppercase font-accent">
              Zobacz portfolio
            </span>
          </button>

          <button
            onClick={() => scrollToSection('order')}
            className="group relative overflow-hidden px-6 py-3 rounded-lg text-sm font-bold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-concept-red to-concept-red-dark transition-all duration-500 hover:shadow-[0_0_30px_rgba(227,24,55,0.6)] hover:-translate-y-1 border border-concept-red/50 font-accent"
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

      {/* Bottom gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-concept-dark to-transparent z-[5]"></div>
    </section>
  );
};

export default Hero;
