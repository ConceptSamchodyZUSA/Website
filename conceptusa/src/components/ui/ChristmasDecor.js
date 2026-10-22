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
 * Layered cinematic snowfall — crystal flakes at mixed depths.
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

/**
 * Premium Vector Santa Hat with subtle bobbing animation
 */
export const SantaHat = ({ className = '', size = 'md', style = {} }) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <span
      className={`santa-hat inline-block pointer-events-none select-none ${sizeClasses[size] || sizeClasses.md} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible drop-shadow-[0_2px_8px_rgba(220,38,38,0.5)]" fill="none">
        <defs>
          <radialGradient id="hatRedGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="60%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>
        </defs>

        {/* Hat Body */}
        <path
          d="M 12 55 C 16 30, 40 16, 68 18 C 76 18, 76 28, 70 34 C 62 42, 60 48, 62 55 Z"
          fill="url(#hatRedGrad)"
        />
        {/* Shadow Fold */}
        <path
          d="M 52 28 C 60 36, 62 46, 62 55 L 60 55 C 56 46, 54 36, 48 30 Z"
          fill="rgba(0, 0, 0, 0.25)"
        />
        {/* Fluffy Fur Brim */}
        <ellipse cx="38" cy="56" rx="28" ry="7.5" fill="#ffffff" />
        <ellipse cx="20" cy="56" rx="9" ry="6" fill="#f8fafc" />
        <ellipse cx="38" cy="56" rx="9" ry="6" fill="#f8fafc" />
        <ellipse cx="56" cy="56" rx="9" ry="6" fill="#f8fafc" />
        {/* Pompom Ball */}
        <circle cx="72" cy="24" r="7" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
        <circle cx="70" cy="22" r="3" fill="#f1f5f9" />
      </svg>
    </span>
  );
};

/**
 * Scalloped frosted snow cap for card tops and modals
 */
export const SnowCap = ({ className = '', style = {} }) => (
  <div className={`pointer-events-none absolute top-0 inset-x-0 h-4 z-20 select-none overflow-hidden ${className}`} style={style} aria-hidden="true">
    <svg viewBox="0 0 500 24" preserveAspectRatio="none" className="w-full h-full fill-white/95 filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.45)]">
      <path d="M0,0 L500,0 L500,4 C 475,18 450,4 425,12 C 400,20 375,6 350,14 C 325,22 300,8 275,16 C 250,22 225,8 200,16 C 175,22 150,6 125,14 C 100,20 75,6 50,14 C 25,20 10,6 0,8 Z" />
    </svg>
  </div>
);

/**
 * Swaying Christmas bauble with glossy finish & golden thread
 */
export const ChristmasBauble = ({
  color = 'gold',
  size = 'sm',
  swing = true,
  threadLength = 32,
  className = '',
  style = {}
}) => {
  const sizeMap = {
    xs: { w: 24, h: 28 + threadLength },
    sm: { w: 32, h: 36 + threadLength },
    md: { w: 44, h: 50 + threadLength },
    lg: { w: 56, h: 64 + threadLength }
  };

  const { w, h } = sizeMap[size] || sizeMap.sm;

  const colorConfig = {
    red: {
      gradient: ['#f87171', '#dc2626', '#7f1d1d'],
      glow: 'rgba(220, 38, 38, 0.45)'
    },
    gold: {
      gradient: ['#fef08a', '#eab308', '#854d0e'],
      glow: 'rgba(234, 179, 8, 0.45)'
    },
    emerald: {
      gradient: ['#6ee7b7', '#059669', '#064e3b'],
      glow: 'rgba(5, 150, 105, 0.45)'
    }
  };

  const activeColor = colorConfig[color] || colorConfig.gold;
  const gradientId = `baubleGrad_${color}_${size}`;

  return (
    <div
      className={`christmas-bauble-wrap ${swing ? 'bauble-swing' : ''} ${className}`}
      style={{
        width: `${w}px`,
        height: `${h}px`,
        transformOrigin: 'top center',
        ...style
      }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 60 ${60 + threadLength}`} className="w-full h-full overflow-visible" fill="none">
        <defs>
          <radialGradient id={gradientId} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor={activeColor.gradient[0]} />
            <stop offset="55%" stopColor={activeColor.gradient[1]} />
            <stop offset="100%" stopColor={activeColor.gradient[2]} />
          </radialGradient>
        </defs>

        {/* Golden Hanging String */}
        <line
          x1="30"
          y1="0"
          x2="30"
          y2={threadLength + 4}
          stroke="#d4af37"
          strokeWidth="1.2"
          strokeDasharray="3,1.5"
        />

        <g transform={`translate(0, ${threadLength})`}>
          <rect x="25" y="0" width="10" height="5" rx="1.5" fill="#d4af37" stroke="#996515" strokeWidth="0.8" />
          <circle cx="30" cy="-2" r="3" stroke="#d4af37" strokeWidth="1.2" fill="none" />
          <circle
            cx="30"
            cy="32"
            r="26"
            fill={`url(#${gradientId})`}
            style={{ filter: `drop-shadow(0 4px 12px ${activeColor.glow})` }}
          />
          <ellipse cx="22" cy="22" rx="8" ry="5" fill="#ffffff" opacity="0.45" transform="rotate(-30 22 22)" />
          <circle cx="16" cy="17" r="2.5" fill="#ffffff" opacity="0.65" />
          <g stroke="#ffffff" strokeWidth="1" opacity="0.75">
            <line x1="30" y1="24" x2="30" y2="40" />
            <line x1="22" y1="32" x2="38" y2="32" />
            <line x1="24" y1="26" x2="36" y2="38" />
            <line x1="24" y1="38" x2="36" y2="26" />
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * Holly branch with red berries
 */
export const PineBranch = ({ className = '', style = {} }) => (
  <span className={`inline-block select-none pointer-events-none w-7 h-7 ${className}`} style={style} aria-hidden="true">
    <svg viewBox="0 0 60 60" className="w-full h-full overflow-visible drop-shadow-[0_2px_6px_rgba(22,163,74,0.4)]" fill="none">
      <path
        d="M 28 32 C 16 32, 10 20, 8 10 C 18 12, 28 18, 30 28 Z"
        fill="#15803d"
        stroke="#166534"
        strokeWidth="1"
      />
      <path
        d="M 32 28 C 42 20, 50 14, 56 12 C 54 22, 46 32, 34 32 Z"
        fill="#16a34a"
        stroke="#15803d"
        strokeWidth="1"
      />
      <path
        d="M 30 34 C 30 46, 24 54, 20 58 C 22 48, 28 40, 32 36 Z"
        fill="#15803d"
        stroke="#166534"
        strokeWidth="1"
      />
      <circle cx="28" cy="30" r="4.5" fill="#dc2626" />
      <circle cx="26.8" cy="28.8" r="1.3" fill="#ffffff" opacity="0.85" />
      <circle cx="34.5" cy="32" r="4" fill="#ef4444" />
      <circle cx="33.5" cy="31" r="1.2" fill="#ffffff" opacity="0.85" />
      <circle cx="31" cy="36.5" r="3.8" fill="#b91c1c" />
      <circle cx="30.2" cy="35.5" r="1.1" fill="#ffffff" opacity="0.85" />
    </svg>
  </span>
);
