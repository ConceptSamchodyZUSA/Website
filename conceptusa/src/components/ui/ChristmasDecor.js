import React from 'react';

/**
 * Atmospheric Falling Snowflakes
 * Renders lightweight, pure CSS animated snowflakes in the background.
 */
export const Snowfall = ({ count = 35, className = '' }) => {
  const flakes = Array.from({ length: count }, (_, i) => {
    const left = (i * 99.7) % 100;
    const duration = 7 + ((i * 3.7) % 8); // 7s to 15s
    const delay = -((i * 2.3) % 10); // staggered starting points
    const size = 3 + (i % 4) * 2; // 3px to 9px
    const opacity = 0.35 + (i % 5) * 0.12; // 0.35 to 0.83
    const drift = ((i % 3) - 1) * 35; // horizontal sway

    return {
      id: i,
      left: `${left}%`,
      duration: `${duration}s`,
      delay: `${delay}s`,
      size: `${size}px`,
      opacity,
      drift: `${drift}px`
    };
  });

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[1] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className="snowflake absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            left: flake.left,
            top: '-20px',
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
            '--drift': flake.drift
          }}
        />
      ))}
    </div>
  );
};

/**
 * Animated Garland of Twinkling Christmas Fairy Lights
 */
export const ChristmasLights = ({ className = '', count = 24 }) => {
  const colors = [
    { fill: '#ef4444', glow: 'rgba(239, 68, 68, 0.85)', anim: 'bulb-twinkle-1' }, // Red
    { fill: '#22c55e', glow: 'rgba(34, 197, 94, 0.85)', anim: 'bulb-twinkle-2' }, // Green
    { fill: '#fbbf24', glow: 'rgba(251, 191, 36, 0.85)', anim: 'bulb-twinkle-3' }, // Gold
    { fill: '#38bdf8', glow: 'rgba(56, 189, 248, 0.85)', anim: 'bulb-twinkle-1' }, // Ice Blue
    { fill: '#f43f5e', glow: 'rgba(244, 63, 94, 0.85)', anim: 'bulb-twinkle-2' }, // Crimson
    { fill: '#a855f7', glow: 'rgba(168, 85, 247, 0.85)', anim: 'bulb-twinkle-3' }, // Purple
  ];

  const bulbs = Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    delay: `${(i * 0.25) % 1.5}s`
  }));

  return (
    <div className={`christmas-lights-wire relative w-full h-8 overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      {/* Curved Garland Wire */}
      <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 1200 32" fill="none">
        <path
          d="M0,8 Q 50,22 100,8 Q 150,22 200,8 Q 250,22 300,8 Q 350,22 400,8 Q 450,22 500,8 Q 550,22 600,8 Q 650,22 700,8 Q 750,22 800,8 Q 850,22 900,8 Q 950,22 1000,8 Q 1050,22 1100,8 Q 1150,22 1200,8"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Bulbs flex container */}
      <div className="flex justify-between items-start px-2 sm:px-6 relative z-10 w-full h-full pt-1.5">
        {bulbs.map((bulb) => (
          <div key={bulb.id} className="relative flex flex-col items-center">
            {/* Socket */}
            <div className="w-1.5 h-1.5 bg-slate-800 rounded-sm" />
            {/* Bulb Glass */}
            <span
              className={`christmas-bulb block w-2.5 h-3.5 sm:w-3 sm:h-4 rounded-full ${bulb.color.anim}`}
              style={{
                backgroundColor: bulb.color.fill,
                boxShadow: `0 0 10px ${bulb.color.glow}, 0 0 20px ${bulb.color.glow}`,
                animationDelay: bulb.delay
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Cute Vector Santa Hat
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
 * Scalloped Snow Cap for borders, headers, and card images
 */
export const SnowCap = ({ className = '', style = {} }) => (
  <div className={`snow-cap pointer-events-none absolute top-0 inset-x-0 h-4 z-20 select-none overflow-hidden ${className}`} style={style} aria-hidden="true">
    <svg viewBox="0 0 500 24" preserveAspectRatio="none" className="w-full h-full fill-white/95 filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]">
      <path d="M0,0 L500,0 L500,4 C 475,18 450,4 425,12 C 400,20 375,6 350,14 C 325,22 300,8 275,16 C 250,22 225,8 200,16 C 175,22 150,6 125,14 C 100,20 75,6 50,14 C 25,20 10,6 0,8 Z" />
    </svg>
  </div>
);

/**
 * Hanging Christmas Tree Bauble / Ornament
 */
export const ChristmasBauble = ({
  color = 'red',
  size = 'md',
  swing = true,
  threadLength = 40,
  className = '',
  style = {}
}) => {
  const sizeMap = {
    sm: { w: 32, h: 36 + threadLength },
    md: { w: 46, h: 52 + threadLength },
    lg: { w: 60, h: 68 + threadLength }
  };

  const { w, h } = sizeMap[size] || sizeMap.md;

  const colorConfig = {
    red: {
      gradient: ['#f87171', '#dc2626', '#7f1d1d'],
      glow: 'rgba(220, 38, 38, 0.45)'
    },
    gold: {
      gradient: ['#fde047', '#eab308', '#78350f'],
      glow: 'rgba(234, 179, 8, 0.45)'
    },
    green: {
      gradient: ['#4ade80', '#16a34a', '#14532d'],
      glow: 'rgba(22, 163, 74, 0.45)'
    },
    blue: {
      gradient: ['#38bdf8', '#0284c7', '#0c4a6e'],
      glow: 'rgba(2, 132, 199, 0.45)'
    }
  };

  const activeColor = colorConfig[color] || colorConfig.red;
  const gradientId = `baubleGrad_${color}`;

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
            <stop offset="50%" stopColor={activeColor.gradient[1]} />
            <stop offset="100%" stopColor={activeColor.gradient[2]} />
          </radialGradient>
        </defs>

        {/* Golden Hanging String */}
        <line
          x1="30"
          y1="0"
          x2="30"
          y2={threadLength + 4}
          stroke="#f59e0b"
          strokeWidth="1.2"
          strokeDasharray="3,1.5"
        />

        <g transform={`translate(0, ${threadLength})`}>
          {/* Bauble Cap & Ring */}
          <rect x="25" y="0" width="10" height="5" rx="1.5" fill="#f59e0b" stroke="#b45309" strokeWidth="0.8" />
          <circle cx="30" cy="-2" r="3" stroke="#f59e0b" strokeWidth="1.2" fill="none" />

          {/* Bauble Sphere */}
          <circle
            cx="30"
            cy="32"
            r="26"
            fill={`url(#${gradientId})`}
            style={{ filter: `drop-shadow(0 4px 12px ${activeColor.glow})` }}
          />

          {/* Glossy Reflection Highlight */}
          <ellipse cx="22" cy="22" rx="8" ry="5" fill="#ffffff" opacity="0.45" transform="rotate(-30 22 22)" />
          <circle cx="16" cy="17" r="2.5" fill="#ffffff" opacity="0.65" />

          {/* Decorative Snowflake pattern on Bauble */}
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
 * Holly Leaves with Red Berries Sprig for headings and cards
 */
export const PineBranch = ({ className = '', style = {} }) => (
  <span className={`inline-block select-none pointer-events-none w-8 h-8 ${className}`} style={style} aria-hidden="true">
    <svg viewBox="0 0 60 60" className="w-full h-full overflow-visible drop-shadow-[0_2px_6px_rgba(22,163,74,0.4)]" fill="none">
      {/* Holly Leaf 1 */}
      <path
        d="M 28 32 C 16 32, 10 20, 8 10 C 18 12, 28 18, 30 28 Z"
        fill="#15803d"
        stroke="#166534"
        strokeWidth="1"
      />
      {/* Holly Leaf 2 */}
      <path
        d="M 32 28 C 42 20, 50 14, 56 12 C 54 22, 46 32, 34 32 Z"
        fill="#16a34a"
        stroke="#15803d"
        strokeWidth="1"
      />
      {/* Holly Leaf 3 */}
      <path
        d="M 30 34 C 30 46, 24 54, 20 58 C 22 48, 28 40, 32 36 Z"
        fill="#15803d"
        stroke="#166534"
        strokeWidth="1"
      />
      {/* Berries with glossy highlight */}
      <circle cx="28" cy="30" r="5" fill="#dc2626" />
      <circle cx="26.5" cy="28.5" r="1.5" fill="#ffffff" opacity="0.8" />

      <circle cx="35" cy="32" r="4.5" fill="#ef4444" />
      <circle cx="33.8" cy="30.8" r="1.3" fill="#ffffff" opacity="0.8" />

      <circle cx="31" cy="37" r="4.2" fill="#b91c1c" />
      <circle cx="30" cy="35.5" r="1.2" fill="#ffffff" opacity="0.8" />
    </svg>
  </span>
);

/**
 * Festive Christmas Badge
 */
export const ChristmasBadge = ({ text = 'Christmas Edition', className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-600/20 border border-red-500/40 text-red-200 shadow-[0_0_15px_rgba(220,38,38,0.3)] backdrop-blur-sm ${className}`}>
    <span className="text-sm select-none">🎄</span>
    <span>{text}</span>
    <span className="text-sm select-none">🎁</span>
  </span>
);
