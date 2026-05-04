import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useCountUp } from '../../hooks/useAnimations';

const backgroundImageFallback = '/background.jpg';

const Hero = ({ isVisible, scrollToSection }) => {
  const { ref: carsCountRef, count: carsCount } = useCountUp(2000, 2200);
  const { ref: safetyCountRef, count: safetyCount } = useCountUp(100, 1800);

  return (
    <section id="home" className={`relative h-screen flex items-center justify-center overflow-hidden ${isVisible ? 'visible' : ''}`}>
      <div className="absolute inset-0 bg-carbon opacity-90 z-0"></div>

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
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-concept-red to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(220,38,38,0.5)]" ref={carsCountRef}>
            +{carsCount}
          </div>
          <div>
            <p className="text-white font-bold tracking-wide">Sprowadzonych</p>
            <p className="text-concept-slate text-sm">pojazdów z USA</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/3 left-[10%] lg:left-[15%] hidden md:block animate-float-delayed z-20">
        <div className="glass-panel px-6 py-4 rounded-2xl border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-4 backdrop-blur-xl">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-concept-blue to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(59,130,246,0.5)]" ref={safetyCountRef}>
            {safetyCount}%
          </div>
          <div>
            <p className="text-white font-bold tracking-wide">Bezpieczeństwo</p>
            <p className="text-concept-slate text-sm">Pełna dokumentacja</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pb-16">
        <h1 className="opacity-0 animate-fade-in-up">
          {/* Spectacular Chrome Logo with Flanking Lines */}
          <div className="relative inline-flex items-center gap-4 md:gap-8 mb-4">
            {/* Left Wing/Line */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-12 md:w-32 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-concept-red shadow-[0_0_15px_rgba(255,26,26,0.8)]"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rotate-45 bg-white shadow-[0_0_10px_white]"></div>
            </div>

            {/* Main Text */}
            <div className="relative group">
              {/* Glowing backplate */}
              <div className="absolute inset-0 bg-concept-red/30 blur-[40px] rounded-full -z-10 animate-pulse-slow group-hover:bg-concept-red/50 transition-all duration-700"></div>
              
              {/* Text Layer */}
              <div className="text-[4rem] md:text-[6.5rem] lg:text-[8rem] font-black tracking-tighter leading-none relative px-2">
                {/* Silver/Chrome Gradient */}
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-600 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                  CONCEPT
                </span>
                {/* Red glow effect on hover */}
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-concept-red to-red-500 animate-gradient-x opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[4px] px-2">
                  CONCEPT
                </span>
              </div>
            </div>

            {/* Right Wing/Line */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 rotate-45 bg-white shadow-[0_0_10px_white]"></div>
              <div className="w-12 md:w-32 h-[2px] bg-gradient-to-l from-transparent via-red-600 to-concept-red shadow-[0_0_15px_rgba(255,26,26,0.8)]"></div>
            </div>
          </div>
          <br />
          <div className="relative inline-block mt-2">
            <span className="text-white/90 text-xl md:text-2xl lg:text-3xl tracking-[0.5em] font-sans font-bold uppercase drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              Samochody <span className="text-concept-red">z USA</span>
            </span>
          </div>
        </h1>

        <p className="text-sm md:text-base mb-6 text-slate-300 font-light max-w-2xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] tracking-wide">
          Premium import amerykańskiej motoryzacji. Dostarczamy emocje prosto do Twojego garażu.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
          <button
            onClick={() => scrollToSection('portfolio')}
            className="group skew-btn bg-white/5 border-metallic hover:bg-white/10 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] w-56 h-14"
          >
            <div className="absolute inset-0 w-1/2 h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="skew-content text-sm font-bold text-white tracking-[0.2em] uppercase">
              Zobacz portfolio
            </span>
          </button>

          <button
            onClick={() => scrollToSection('order')}
            className="group skew-btn bg-concept-red border border-red-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,26,26,0.8)] hover:bg-concept-red-light w-56 h-14"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan"></div>
            <span className="skew-content relative z-10 text-sm font-bold tracking-[0.2em] uppercase text-white flex gap-3">
              Zamów auto
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </button>
        </div>
      </div>

      {/* Odkryj arrow — positioned relative to the SECTION (h-screen), NOT the content container */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 opacity-60 hover:opacity-100 cursor-pointer hover:text-white transition-all duration-300 z-30" onClick={() => scrollToSection('about')}>
        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Odkryj</span>
        <ChevronDown className="animate-bounce mt-1 text-concept-red" size={20} />
      </div>
    </section>
  );
};

export default Hero;
