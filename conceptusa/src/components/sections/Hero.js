import React from 'react';
import { ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { useCountUp } from '../../hooks/useAnimations';

const backgroundImageFallback = '/background.jpg';

const Hero = ({ isVisible, scrollToSection }) => {
  const { ref: carsCountRef, count: carsCount } = useCountUp(2000, 2200);
  const { ref: safetyCountRef, count: safetyCount } = useCountUp(100, 1800);

  const handleHeroPointerMove = (event) => {
    if (event.pointerType === 'touch') return;

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const pointerX = (event.clientX - left) / width;
    const pointerY = (event.clientY - top) / height;
    const relativeX = (pointerX - 0.5) * 2;
    const relativeY = (pointerY - 0.5) * 2;
    const art = event.currentTarget;

    art.style.setProperty('--tilt-x', `${(relativeX * 11).toFixed(2)}deg`);
    art.style.setProperty('--tilt-y', `${(relativeY * -7).toFixed(2)}deg`);
    art.style.setProperty('--image-shift-x', `${(relativeX * -18).toFixed(1)}px`);
    art.style.setProperty('--image-shift-y', `${(relativeY * -12).toFixed(1)}px`);
    art.style.setProperty('--spot-x', `${(pointerX * 100).toFixed(1)}%`);
    art.style.setProperty('--spot-y', `${(pointerY * 100).toFixed(1)}%`);
    art.classList.add('is-interacting');
  };

  const resetHeroPointer = (event) => {
    event.currentTarget.classList.remove('is-interacting');
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
    event.currentTarget.style.setProperty('--image-shift-x', '0px');
    event.currentTarget.style.setProperty('--image-shift-y', '0px');
    event.currentTarget.style.setProperty('--spot-x', '50%');
    event.currentTarget.style.setProperty('--spot-y', '50%');
  };

  return (
    <section id="home" className={`hero-section halloween-season relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-concept-dark ${isVisible ? 'visible' : ''}`}>
      <div className="halloween-decor" aria-hidden="true">
        <span className="halloween-bat halloween-bat--one">
          <svg viewBox="0 0 64 36" focusable="false"><path d="M32 31c-4-4-7-9-8-15-4 4-8 4-12-2-1 6-5 8-10 4C4 10 9 6 17 7c4 0 7 3 10 7l5-5 5 5c3-4 6-7 10-7 8-1 13 3 15 11-5 4-9 2-10-4-4 6-8 6-12 2-1 6-4 11-8 15Z" /></svg>
        </span>
        <span className="halloween-bat halloween-bat--two">
          <svg viewBox="0 0 64 36" focusable="false"><path d="M32 31c-4-4-7-9-8-15-4 4-8 4-12-2-1 6-5 8-10 4C4 10 9 6 17 7c4 0 7 3 10 7l5-5 5 5c3-4 6-7 10-7 8-1 13 3 15 11-5 4-9 2-10-4-4 6-8 6-12 2-1 6-4 11-8 15Z" /></svg>
        </span>
        <span className="halloween-bat halloween-bat--three">
          <svg viewBox="0 0 64 36" focusable="false"><path d="M32 31c-4-4-7-9-8-15-4 4-8 4-12-2-1 6-5 8-10 4C4 10 9 6 17 7c4 0 7 3 10 7l5-5 5 5c3-4 6-7 10-7 8-1 13 3 15 11-5 4-9 2-10-4-4 6-8 6-12 2-1 6-4 11-8 15Z" /></svg>
        </span>
        <span className="halloween-pumpkin halloween-pumpkin--left">
          <svg viewBox="0 0 100 90" focusable="false">
            <path className="pumpkin-stem" d="M48 24c-2-7 1-13 8-17 1 6 0 11-4 16" />
            <path className="pumpkin-body" d="M50 22C28 11 10 25 10 49c0 23 15 35 40 35s40-12 40-35C90 25 72 11 50 22Z" />
            <path className="pumpkin-ridge" d="M50 22c-8 10-9 48 0 62M38 20c-8 13-9 43 0 61M62 20c8 13 9 43 0 61" />
            <path className="pumpkin-face" d="m29 39 14 5-12 9-2-14Zm42 0-14 5 12 9 2-14ZM43 62h14l-7 10-7-10Z" />
          </svg>
        </span>
        <span className="halloween-pumpkin halloween-pumpkin--right">
          <svg viewBox="0 0 100 90" focusable="false">
            <path className="pumpkin-stem" d="M48 24c-2-7 1-13 8-17 1 6 0 11-4 16" />
            <path className="pumpkin-body" d="M50 22C28 11 10 25 10 49c0 23 15 35 40 35s40-12 40-35C90 25 72 11 50 22Z" />
            <path className="pumpkin-ridge" d="M50 22c-8 10-9 48 0 62M38 20c-8 13-9 43 0 61M62 20c8 13 9 43 0 61" />
            <path className="pumpkin-face" d="m29 39 14 5-12 9-2-14Zm42 0-14 5 12 9 2-14ZM43 62h14l-7 10-7-10Z" />
          </svg>
        </span>
      </div>
      <div
        className="hero-art"
        aria-hidden="true"
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={resetHeroPointer}
      >
        <div className="hero-orbit" />
        <div className="hero-art-frame">
          <picture>
            <source
              srcSet="/optimized-images/background-400w.webp 400w,
                      /optimized-images/background-800w.webp 800w,
                      /optimized-images/background-1200w.webp 1200w"
              sizes="(max-width: 768px) 100vw, 68vw"
              type="image/webp"
            />
            <img
              src={backgroundImageFallback}
              alt=""
              className="hero-art-image"
              loading="eager"
            />
          </picture>
          <div className="hero-art-shine" />
          <div className="hero-art-caption">
            <span className="hero-art-caption-mark">USA</span>
            <span className="hero-art-caption-copy">Wybrane z charakterem<br />Sprowadzone z pewnością</span>
          </div>
        </div>
        <div className="hero-art-index"><span>01</span> / AMERICAN ICONS</div>
      </div>
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-28 pt-20 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.75fr)] lg:px-10">
        <div className="max-w-3xl text-left">
          <div className="mb-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
            <span className="h-px w-10 bg-orange-400" />
            <span className="halloween-kicker">Halloween edition</span>
            <span className="text-slate-500">·</span>
            Amerykańska motoryzacja
          </div>

          <h1 className="hero-heading mb-7 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Ikony z Ameryki
            <span className="mt-3 block font-light text-slate-300">na Twoich zasadach.</span>
          </h1>

          <p className="mb-9 max-w-lg text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Znajdziemy, sprawdzimy i dostarczymy auto, którego naprawdę chcesz. Ty wybierasz samochód — my zajmujemy się całą resztą.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => scrollToSection('portfolio')}
              className="neon-cta group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-concept-red px-7 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Zobacz dostępne auta
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToSection('order')}
              className="neon-outline-cta inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.04] px-7 text-sm font-semibold text-white transition-colors hover:bg-white/[0.1]"
            >
              Zapytaj o import
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-2 gap-6 border-t border-white/15 pt-6 lg:mt-16">
            <div>
              <p className="mb-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl" ref={carsCountRef}>+{carsCount}</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:text-xs">sprowadzonych aut</p>
            </div>
            <div className="border-l border-white/15 pl-6">
              <div ref={safetyCountRef} className="mb-1 flex items-center gap-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {safetyCount}% <ShieldCheck size={20} className="text-concept-blue-light" />
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 sm:text-xs">pełna dokumentacja</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        aria-label="Przejdź do sekcji O nas"
        className="hero-scroll-cue absolute bottom-7 z-20 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-white"
        onClick={() => scrollToSection('about')}
      >
        <ChevronDown size={15} /> Poznaj nas
      </button>
    </section>
  );
};

export default Hero;
