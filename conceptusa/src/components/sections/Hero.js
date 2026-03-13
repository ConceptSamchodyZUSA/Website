import React from 'react';
import { ChevronDown } from 'lucide-react';

const backgroundImageFallback = '/background.jpg';

const Hero = ({ isVisible, scrollToSection }) => {
  return (
    <section id="home" className={`relative h-screen flex items-center justify-center overflow-hidden ${isVisible ? 'visible' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-concept-dark/80 via-concept-dark/60 to-concept-dark/80 z-0"></div>

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

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-heading tracking-tight drop-shadow-2xl">
          <div className="relative inline-block mb-2 text-white">
            CONCEPT
          </div>
          <br />
          <div className="relative inline-block mt-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-concept-slate via-slate-300 to-concept-slate text-4xl md:text-5xl lg:text-6xl tracking-wide font-sans font-light">
              Samochody z USA
            </span>
          </div>
        </h1>

        <p className="text-xl md:text-2xl mb-12 text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          Premium import amerykańskiej motoryzacji. Dostarczamy emocje prosto do Twojego garażu.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => scrollToSection('portfolio')}
            className="group relative overflow-hidden glass rounded-full px-8 py-4 transition-all duration-300 hover:bg-white/10"
          >
            <div className="absolute inset-0 w-1/2 h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative text-lg font-medium text-white tracking-wide">
              Zobacz portfolio
            </span>
          </button>

          <button
            onClick={() => scrollToSection('order')}
            className="px-8 py-4 rounded-full text-lg font-medium tracking-wide text-white bg-concept-red transition-all duration-300 hover:bg-concept-red-dark hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:-translate-y-1"
          >
            Zamów auto
          </button>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 opacity-80 cursor-pointer hover:text-white transition-colors" onClick={() => scrollToSection('about')}>
          <span className="text-sm font-medium tracking-widest uppercase">Odkryj</span>
          <ChevronDown className="animate-bounce" size={24} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
