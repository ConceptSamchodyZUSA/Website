module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Bebas Neue', 'sans-serif'],
        accent: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        concept: {
          red: {
            DEFAULT: '#E31837',  // Dodge Viper Red
            light: '#FF2D55',    // Hot rod accent
            dark: '#9B1B30',     // Deep burgundy
          },
          blue: {
            DEFAULT: '#5B7B9A',  // Gunmetal Blue
            light: '#7A9BB5',
            dark: '#3D5A73',
          },
          chrome: '#C0C0C0',     // Chrome Silver
          gold: '#D4A853',       // Burnished Gold
          dark: '#0A0A0F',       // Near-black showroom
          gray: '#141419',       // Slightly lighter dark
          slate: '#2A2A35',      // Metallic accent
        }
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up-delay-1': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards',
        'fade-in-up-delay-2': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'blob': 'blob 7s infinite',
        'scan': 'scan 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'stripe-shimmer': 'stripeShimmer 3s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        stripeShimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    }
  },
  plugins: [],
};
