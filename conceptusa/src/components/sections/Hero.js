import React from 'react';
import { ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { useCountUp } from '../../hooks/useAnimations';

const backgroundImageFallback = '/background.jpg';

const Hero = ({ isVisible, scrollToSection }) => {
  const { ref: carsCountRef, count: carsCount } = useCountUp(2000, 2200);
  const { ref: safetyCountRef, count: safetyCount } = useCountUp(100, 1800);

  return (
    <section id="home" className={`relative isolate flex min-h-[100svh] items-center overflow-hidden bg-concept-dark ${isVisible ? 'visible' : ''}`}>
      <div className="absolute inset-0">
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
      <div className="absolute inset-0 bg-gradient-to-r from-concept-dark via-concept-dark/85 to-concept-dark/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-concept-dark via-transparent to-concept-dark/25" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-12 px-5 pb-28 pt-32 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-10">
        <div className="max-w-3xl text-left">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-concept-red shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
            Import samochodów z USA · od A do Z
          </div>

          <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Ikony z Ameryki.
            <span className="mt-2 block text-slate-300">Na Twoich zasadach.</span>
          </h1>

          <p className="mb-9 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Znajdziemy, sprawdzimy i dostarczymy auto, którego naprawdę chcesz. Ty wybierasz samochód — my zajmujemy się całą resztą.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => scrollToSection('portfolio')}
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.07] px-7 text-sm font-semibold text-white transition-colors hover:bg-white/[0.13]"
          >
            Zobacz dostępne auta
            <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => scrollToSection('order')}
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-concept-red px-7 text-sm font-semibold text-white shadow-lg shadow-red-950/30 transition-colors hover:bg-red-700"
          >
            Zapytaj o import
            <ArrowRight size={17} />
          </button>
          </div>
        </div>

        <div className="grid max-w-md grid-cols-2 gap-3 lg:mb-1 lg:w-[360px]">
          <div className="rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-md">
            <p className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl" ref={carsCountRef}>+{carsCount}</p>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">sprowadzonych aut</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-md">
            <div ref={safetyCountRef} className="mb-2 flex items-center gap-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {safetyCount}% <ShieldCheck size={22} className="text-emerald-400" />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">pełna dokumentacja</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Przejdź do sekcji O nas"
        className="absolute bottom-7 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-300 transition-colors hover:text-white"
        onClick={() => scrollToSection('about')}
      >
        Poznaj nas <ChevronDown size={15} />
      </button>
    </section>
  );
};

export default Hero;
