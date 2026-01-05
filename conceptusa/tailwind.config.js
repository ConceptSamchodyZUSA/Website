module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        concept: {
          red: {
            DEFAULT: '#dc2626',
            light: '#ef4444',
            dark: '#b91c1c',
          },
          blue: {
            DEFAULT: '#3b82f6',
            light: '#60a5fa',
            dark: '#2563eb',
          },
          dark: '#111827',
          gray: '#1f2937',
        }
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'police-lights': 'policeLights 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    }
  },
  plugins: [],
};
