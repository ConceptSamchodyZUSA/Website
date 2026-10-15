import React from 'react';

/**
 * Halloween Corner Spiderweb
 * Can be positioned in any corner (top-left, top-right, bottom-left, bottom-right).
 */
export const HalloweenCobweb = ({
  corner = 'top-left',
  size = 'md',
  className = '',
  opacity = 'opacity-50 hover:opacity-85'
}) => {
  const cornerTransforms = {
    'top-left': '',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]'
  };

  const sizeClasses = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-24 h-24 sm:w-32 sm:h-32',
    lg: 'w-36 h-36 sm:w-48 sm:h-48',
    xl: 'w-48 h-48 sm:w-64 sm:h-64'
  };

  return (
    <svg
      className={`halloween-cobweb pointer-events-none transition-opacity duration-300 ${cornerTransforms[corner] || ''} ${sizeClasses[size] || sizeClasses.md} ${opacity} ${className}`}
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="webSilkGlow" cx="0%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0.15" />
        </radialGradient>
      </defs>
      {/* Structural anchor spokes */}
      <path
        className="web-spoke"
        d="M0 0 L160 160 M0 0 L160 0 M0 0 L0 160 M0 0 L160 55 M0 0 L55 160 M0 0 L160 110 M0 0 L110 160 M0 0 L80 80"
        stroke="url(#webSilkGlow)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Concentric spiral web loops */}
      <path
        className="web-spiral"
        d="M0 24 C 13 24, 24 13, 24 0
           M0 48 C 27 48, 48 27, 48 0
           M0 76 C 42 76, 76 42, 76 0
           M0 106 C 58 106, 106 58, 106 0
           M0 138 C 76 138, 138 76, 138 0
           M0 160 C 88 160, 160 88, 160 0"
        stroke="url(#webSilkGlow)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Delicate connecting cross-threads */}
      <path
        d="M24 24 L36 36 M48 48 L68 68 M76 76 L102 102 M106 106 L130 130"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="0.8"
        strokeDasharray="2,3"
      />
    </svg>
  );
};

/**
 * Hanging Spider suspended from a silk thread with swinging physics.
 */
export const HalloweenSpider = ({
  hanging = true,
  threadLength = 70,
  swing = true,
  size = 'md',
  className = '',
  style = {}
}) => {
  const sizeMap = {
    sm: { width: 36, height: 42 + (hanging ? threadLength : 0), scale: 0.75 },
    md: { width: 48, height: 56 + (hanging ? threadLength : 0), scale: 1 },
    lg: { width: 64, height: 74 + (hanging ? threadLength : 0), scale: 1.3 }
  };

  const { width, height } = sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`halloween-spider-wrap ${swing ? 'spider-swing' : ''} ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transformOrigin: 'top center',
        ...style
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 90 ${90 + (hanging ? threadLength : 0)}`}
        className="w-full h-full overflow-visible"
        fill="none"
        focusable="false"
      >
        <defs>
          <radialGradient id="spiderBodyGlow" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="60%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0b0a1a" />
          </radialGradient>
          <filter id="spiderGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f97316" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Silk Thread */}
        {hanging && (
          <line
            x1="45"
            y1="0"
            x2="45"
            y2={threadLength + 10}
            stroke="rgba(255, 255, 255, 0.55)"
            strokeWidth="1.2"
            strokeDasharray="4,2"
            className="spider-silk-thread"
          />
        )}

        <g transform={`translate(0, ${hanging ? threadLength : 0})`} filter="url(#spiderGlow)">
          {/* Spider Legs with animated twitch */}
          <g className="spider-legs" stroke="#181326" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Left Legs */}
            <path d="M 38 35 Q 18 18 8 26" className="spider-leg spider-leg-1" />
            <path d="M 36 40 Q 12 36 6 46" className="spider-leg spider-leg-2" />
            <path d="M 37 46 Q 14 54 8 68" className="spider-leg spider-leg-3" />
            <path d="M 39 52 Q 20 72 16 88" className="spider-leg spider-leg-4" />

            {/* Right Legs */}
            <path d="M 52 35 Q 72 18 82 26" className="spider-leg spider-leg-1" />
            <path d="M 54 40 Q 78 36 84 46" className="spider-leg spider-leg-2" />
            <path d="M 53 46 Q 76 54 82 68" className="spider-leg spider-leg-3" />
            <path d="M 51 52 Q 70 72 74 88" className="spider-leg spider-leg-4" />
          </g>

          {/* Abdomen / Body */}
          <ellipse
            cx="45"
            cy="52"
            rx="14"
            ry="18"
            fill="url(#spiderBodyGlow)"
            stroke="#4c1d95"
            strokeWidth="1.5"
            className="spider-abdomen"
          />

          {/* Cephalothorax / Head */}
          <circle
            cx="45"
            cy="33"
            r="10"
            fill="url(#spiderBodyGlow)"
            stroke="#4c1d95"
            strokeWidth="1.5"
          />

          {/* Abdomen Skull/Hourglass Mark */}
          <path
            d="M 42 46 L 48 46 L 45 52 L 48 58 L 42 58 L 45 52 Z"
            fill="#f97316"
            opacity="0.9"
            className="spider-mark"
          />

          {/* Glowing Red Eyes with candlelight flicker */}
          <circle cx="41" cy="31" r="2" fill="#ef4444" className="spider-eye" />
          <circle cx="49" cy="31" r="2" fill="#ef4444" className="spider-eye" />
          <circle cx="37" cy="34" r="1.2" fill="#f97316" className="spider-eye" />
          <circle cx="53" cy="34" r="1.2" fill="#f97316" className="spider-eye" />
        </g>
      </svg>
    </div>
  );
};

/**
 * Jack-o'-Lantern Pumpkin with warm glowing flickering candlelight.
 */
export const HalloweenPumpkin = ({
  size = 'md',
  variant = 'classic',
  className = '',
  glow = true,
  style = {}
}) => {
  const sizeClasses = {
    sm: 'w-10 h-9 sm:w-12 sm:h-11',
    md: 'w-16 h-14 sm:w-20 sm:h-18',
    lg: 'w-24 h-22 sm:w-32 sm:h-28',
    xl: 'w-32 h-28 sm:w-44 sm:h-40'
  };

  return (
    <div
      className={`halloween-pumpkin-container inline-block select-none ${glow ? 'pumpkin-glow-active' : ''} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 90"
        className="w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(249,115,22,0.45)]"
        focusable="false"
      >
        <defs>
          {/* Pumpkin Skin Gradient */}
          <radialGradient id="pumpkinSkin" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="45%" stopColor="#ea580c" />
            <stop offset="90%" stopColor="#9a3412" />
            <stop offset="100%" stopColor="#431407" />
          </radialGradient>

          {/* Candle Flame Inner Glow */}
          <radialGradient id="candleFlameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#fde047" />
            <stop offset="75%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#dc2626" />
          </radialGradient>

          <filter id="flickerBlur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stem */}
        <path
          d="M 48 24 C 47 16, 49 10, 58 6 C 59 13, 56 18, 52 24 Z"
          fill="#4d7c0f"
          stroke="#365314"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Pumpkin Back Lobes */}
        <ellipse cx="32" cy="52" rx="20" ry="28" fill="url(#pumpkinSkin)" />
        <ellipse cx="68" cy="52" rx="20" ry="28" fill="url(#pumpkinSkin)" />

        {/* Pumpkin Middle Lobes */}
        <ellipse cx="40" cy="54" rx="20" ry="30" fill="url(#pumpkinSkin)" />
        <ellipse cx="60" cy="54" rx="20" ry="30" fill="url(#pumpkinSkin)" />

        {/* Pumpkin Central Lobe */}
        <ellipse cx="50" cy="55" rx="19" ry="31" fill="url(#pumpkinSkin)" stroke="#7c2d12" strokeWidth="1" />

        {/* Surface Ridges Definition */}
        <path
          d="M 50 24 C 36 34, 34 68, 48 85 M 50 24 C 64 34, 66 68, 52 85"
          fill="none"
          stroke="rgba(67, 20, 7, 0.45)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Carved Glowing Eyes & Mouth */}
        <g className="pumpkin-face-glow candle-flicker" filter="url(#flickerBlur)">
          {variant === 'creepy' ? (
            <>
              {/* Creepy Angular Slit Eyes */}
              <polygon points="26,38 42,42 34,50" fill="url(#candleFlameGlow)" />
              <polygon points="74,38 58,42 66,50" fill="url(#candleFlameGlow)" />
              {/* Nose */}
              <polygon points="50,48 45,56 55,56" fill="url(#candleFlameGlow)" />
              {/* Jagged Stitched Mouth */}
              <path
                d="M 22 66 L 32 60 L 40 68 L 50 61 L 60 69 L 70 61 L 78 67 L 70 73 L 60 67 L 50 74 L 40 67 L 30 73 Z"
                fill="url(#candleFlameGlow)"
              />
            </>
          ) : (
            <>
              {/* Classic Triangles */}
              <polygon points="28,40 42,44 32,52" fill="url(#candleFlameGlow)" />
              <polygon points="72,40 58,44 68,52" fill="url(#candleFlameGlow)" />
              {/* Triangular Nose */}
              <polygon points="50,48 45,56 55,56" fill="url(#candleFlameGlow)" />
              {/* Classic Grinning Tooth Mouth */}
              <path
                d="M 24 64
                   C 32 78, 68 78, 76 64
                   L 70 66 L 68 62 L 62 65 L 60 69 L 54 66 L 50 71 L 46 66 L 40 69 L 38 65 L 32 62 L 30 66 Z"
                fill="url(#candleFlameGlow)"
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
};

/**
 * Animated Flying Halloween Bat
 */
export const HalloweenBat = ({
  className = '',
  size = 'md',
  style = {}
}) => {
  const sizeClasses = {
    sm: 'w-7 h-4 sm:w-9 sm:h-5',
    md: 'w-10 h-6 sm:w-14 sm:h-8',
    lg: 'w-16 h-9 sm:w-20 sm:h-11'
  };

  return (
    <span
      className={`halloween-bat inline-block pointer-events-none select-none ${sizeClasses[size] || sizeClasses.md} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 36" className="w-full h-full overflow-visible" fill="currentColor" focusable="false">
        <path
          d="M 32 30
             C 28 26, 25 21, 24 15
             C 20 19, 16 19, 12 13
             C 11 19, 7 21, 2 17
             C 4 10, 9 6, 17 7
             C 21 7, 24 10, 27 14
             L 32 9
             L 37 14
             C 40 10, 43 7, 47 7
             C 55 6, 60 10, 62 17
             C 57 21, 53 19, 52 13
             C 48 19, 44 19, 40 15
             C 39 21, 36 26, 32 30 Z"
          className="bat-silhouette"
        />
        {/* Tiny Glowing Bat Eyes */}
        <circle cx="30.5" cy="13" r="0.8" fill="#fb923c" />
        <circle cx="33.5" cy="13" r="0.8" fill="#fb923c" />
      </svg>
    </span>
  );
};

/**
 * Floating Spooky Ghost Apparition
 */
export const HalloweenGhost = ({
  className = '',
  size = 'md',
  style = {}
}) => {
  const sizeClasses = {
    sm: 'w-10 h-14',
    md: 'w-16 h-20',
    lg: 'w-24 h-28'
  };

  return (
    <div
      className={`halloween-ghost pointer-events-none inline-block ${sizeClasses[size] || sizeClasses.md} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 100" className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(168,85,247,0.35)]" fill="none">
        <defs>
          <linearGradient id="ghostShade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#e0e7ff" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        {/* Flowing Ghost Body */}
        <path
          d="M 40 10
             C 20 10, 12 28, 12 50
             C 12 72, 16 88, 20 86
             C 26 84, 28 92, 34 88
             C 40 84, 44 94, 50 88
             C 56 82, 60 90, 64 85
             C 68 80, 68 65, 68 50
             C 68 28, 60 10, 40 10 Z"
          fill="url(#ghostShade)"
          className="ghost-body"
        />
        {/* Ghost Spooky/Cute Eyes */}
        <ellipse cx="32" cy="40" rx="3.5" ry="5.5" fill="#1e1b4b" />
        <ellipse cx="48" cy="40" rx="3.5" ry="5.5" fill="#1e1b4b" />
        <circle cx="33" cy="38" r="1.2" fill="#ffffff" />
        <circle cx="49" cy="38" r="1.2" fill="#ffffff" />
        {/* Surprised O-Mouth */}
        <ellipse cx="40" cy="52" rx="3" ry="4.5" fill="#1e1b4b" />
        {/* Blushing cheeks */}
        <ellipse cx="25" cy="46" rx="3" ry="1.5" fill="#f472b6" opacity="0.6" />
        <ellipse cx="55" cy="46" rx="3" ry="1.5" fill="#f472b6" opacity="0.6" />
      </svg>
    </div>
  );
};

/**
 * Spooky Floating Embers / Firefly Particles for Hero / Section backgrounds
 */
export const HalloweenFloatingEmbers = ({ count = 12 }) => {
  const embers = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 8.3 + 4) % 96}%`,
    duration: `${6 + ((i * 1.7) % 5)}s`,
    delay: `${(i * 0.8) % 4}s`,
    size: `${3 + (i % 3) * 2}px`,
    color: i % 2 === 0 ? 'bg-orange-400 shadow-[0_0_10px_#f97316]' : 'bg-purple-400 shadow-[0_0_10px_#a855f7]'
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]" aria-hidden="true">
      {embers.map((ember) => (
        <span
          key={ember.id}
          className={`absolute rounded-full opacity-60 ember-particle ${ember.color}`}
          style={{
            left: ember.left,
            bottom: '-10px',
            width: ember.size,
            height: ember.size,
            animationDuration: ember.duration,
            animationDelay: ember.delay
          }}
        />
      ))}
    </div>
  );
};

/**
 * Festive Halloween badge
 */
export const HalloweenBadge = ({ text = 'Halloween Edition', className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-orange-500/15 border border-orange-500/35 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.2)] ${className}`}>
    <span className="text-sm">🎃</span>
    <span>{text}</span>
  </span>
);
