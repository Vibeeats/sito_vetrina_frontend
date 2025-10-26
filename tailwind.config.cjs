/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#681618',
        secondary: '#4A2C2A',
        accent: '#B8C5A5',
        surface: '#F9F5EB',
        muted: '#5F706F'
      },
      fontFamily: {
        sans: ['"Inter"', '"Manrope"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 40px -22px rgba(74, 44, 42, 0.25)',
        hover: '0 25px 55px -24px rgba(104, 22, 24, 0.35)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(104,22,24,0.18), transparent 55%), radial-gradient(circle at bottom right, rgba(184,197,165,0.45), transparent 65%)',
        'ai-grid': 'linear-gradient(120deg, rgba(184,197,165,0.12) 0%, rgba(184,197,165,0.04) 45%, transparent 60%), repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(104,22,24,0.08) 22px, rgba(104,22,24,0.08) 23px), repeating-linear-gradient(90deg, transparent, transparent 22px, rgba(104,22,24,0.06) 22px, rgba(104,22,24,0.06) 23px)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(1.5rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        floatBlob: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -12px, 0) scale(1.05)' },
          '100%': { transform: 'translate3d(0, 0, 0) scale(1)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.55, transform: 'scale(0.95)' },
          '50%': { opacity: 0.95, transform: 'scale(1.05)' }
        },
        backgroundPan: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        },
        floatTilt: {
          '0%': { transform: 'rotate3d(1, 1, 0, 0deg)' },
          '50%': { transform: 'rotate3d(1, 1, 0, 3deg)' },
          '100%': { transform: 'rotate3d(1, 1, 0, 0deg)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out both',
        slideUp: 'slideUp 0.8s ease-out both',
        floatBlob: 'floatBlob 12s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 8s ease-in-out infinite',
        'background-pan': 'backgroundPan 18s ease infinite',
        'float-tilt': 'floatTilt 12s ease-in-out infinite'
      },
      maxWidth: {
        content: '1200px'
      }
    }
  },
  plugins: []
};
