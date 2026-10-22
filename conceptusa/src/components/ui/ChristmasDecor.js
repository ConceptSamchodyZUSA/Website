import React, { useEffect, useMemo, useState } from 'react';

const LIGHT_PALETTE = [
  { fill: '#fff4d4', glow: 'rgba(255, 244, 212, 0.85)' },
  { fill: '#e11d2e', glow: 'rgba(225, 29, 46, 0.8)' },
  { fill: '#e8c547', glow: 'rgba(232, 197, 71, 0.85)' },
  { fill: '#f7e7b0', glow: 'rgba(247, 231, 176, 0.75)' },
  { fill: '#b91c1c', glow: 'rgba(185, 28, 28, 0.75)' },
];

const LIGHT_WAVE = 7;
const lightY = (t) => 13 + Math.sin(t * Math.PI * LIGHT_WAVE) * 7.5;

const FLAKE_PATHS = [
  'M12 1.6v20.8M1.6 12h20.8M4.2 4.2l15.6 15.6M19.8 4.2 4.2 19.8M12 4.2l1.5 2.6H10.5L12 4.2zm0 15.6-1.5-2.6h3L12 19.8zM4.2 12l2.6-1.5v3L4.2 12zm15.6 0-2.6 1.5v-3l2.6 1.5z',
  'M12 2.2v19.6M3.8 12h16.4M6 6l12 12M18 6 6 18M12 6.4l2.1 1.2-2.1 1.2-2.1-1.2L12 6.4zm0 11.2 2.1-1.2-2.1-1.2-2.1 1.2L12 17.6z',
  'M12 1.8v20.4M2 12h20M5.1 5.1l13.8 13.8M18.9 5.1 5.1 18.9',
];

/**
 * Layered cinematic snowfall — crystal flakes at mixed depths, not white dots.
 */
export const Snowfall = ({ count = 36, className = '' }) => {
  const [enabled, setEnabled] = useState(true);
  const [flakeCount, setFlakeCount] = useState(count);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 767px)');
    const sync = () => {
      setEnabled(!motion.matches);
      setFlakeCount(mobile.matches ? Math.min(18, count) : count);
    };
    sync();
    motion.addEventListener('change', sync);
    mobile.addEventListener('change', sync);
    return () => {
      motion.removeEventListener('change', sync);
      mobile.removeEventListener('change', sync);
    };
  }, [count]);

  const flakes = useMemo(
    () =>
      Array.from({ length: flakeCount }, (_, i) => {
        const depth = i % 3;
        const size = depth === 0 ? 7 : depth === 1 ? 10 : 14;
        return {
          id: i,
          left: `${(i * 97.3 + 8) % 100}%`,
          duration: `${11 + ((i * 4.1) % 12)}s`,
          delay: `${-((i * 1.9) % 14)}s`,
          size,
          opacity: depth === 0 ? 0.28 : depth === 1 ? 0.45 : 0.72,
          drift: `${((i % 5) - 2) * 42}px`,
          spin: `${140 + (i % 7) * 40}deg`,
          blur: depth === 0 ? 0.6 : 0,
          path: FLAKE_PATHS[i % FLAKE_PATHS.length],
        };
      }),
    [flakeCount]
  );

  if (!enabled) return null;

  return (
    <div className={`christmas-snowfall ${className}`} aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            filter: flake.blur ? `blur(${flake.blur}px)` : undefined,
            '--drift': flake.drift,
            '--spin': flake.spin,
          }}
        >
          <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
            <path
              d={flake.path}
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="1.15"
              strokeLinecap="round"
            />
          </svg>
        </span>
      ))}
    </div>
  );
};

/**
 * Warm garland: champagne, ruby and gold teardrops on a matching sine wire.
 */
export const ChristmasLights = ({ className = '', count = 22 }) => {
  const wirePath = useMemo(() => {
    const steps = 48;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps;
      const cmd = i === 0 ? 'M' : 'L';
      return `${cmd} ${(t * 1200).toFixed(1)} ${lightY(t).toFixed(1)}`;
    }).join(' ');
  }, []);

  const bulbs = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const t = count === 1 ? 0.5 : i / (count - 1);
        return {
          id: i,
          left: `${t * 100}%`,
          top: `${(lightY(t) / 36) * 100}%`,
          color: LIGHT_PALETTE[i % LIGHT_PALETTE.length],
          delay: `${(i * 0.18) % 1.8}s`,
          anim: `bulb-twinkle-${(i % 3) + 1}`,
        };
      }),
    [count]
  );

  return (
    <div className={`christmas-lights-wire ${className}`} aria-hidden="true">
      <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 36" fill="none">
        <path d={wirePath} stroke="rgba(212, 175, 55, 0.28)" strokeWidth="1.4" />
        <path d={wirePath} stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.6" />
      </svg>
      {bulbs.map((bulb) => (
        <span
          key={bulb.id}
          className="christmas-bulb-wrap"
          style={{ left: bulb.left, top: bulb.top }}
        >
          <span className="christmas-bulb-socket" />
          <span
            className={`christmas-bulb ${bulb.anim}`}
            style={{
              background: `radial-gradient(circle at 35% 30%, #fff 0%, ${bulb.color.fill} 42%, ${bulb.color.fill} 100%)`,
              boxShadow: `0 0 8px ${bulb.color.glow}, 0 0 16px ${bulb.color.glow}`,
              animationDelay: bulb.delay,
            }}
          />
        </span>
      ))}
    </div>
  );
};

export const WinterAtmosphere = ({ className = '' }) => (
  <div className={`christmas-atmosphere ${className}`} aria-hidden="true">
    <div className="christmas-vignette" />
    <div className="christmas-frost-edge" />
  </div>
);

export const ChristmasBadge = ({ text = 'Edycja świąteczna', className = '' }) => (
  <span className={`christmas-badge ${className}`}>
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
      <path
        d="M8 1.4v13.2M1.4 8h13.2M3.4 3.4l9.2 9.2M12.6 3.4 3.4 12.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
    <span>{text}</span>
  </span>
);

export const GoldRule = ({ className = '' }) => (
  <span className={`christmas-gold-rule ${className}`} aria-hidden="true" />
);
