/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6E59F5'
      },
      fontFamily: {
        sans: ['"Inter"', '"Manrope"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 40px -20px rgba(110, 89, 245, 0.35)',
        hover: '0 25px 50px -20px rgba(110, 89, 245, 0.45)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(110,89,245,0.25), transparent 55%), radial-gradient(circle at bottom right, rgba(110,89,245,0.2), transparent 60%)'
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
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out both',
        slideUp: 'slideUp 0.8s ease-out both',
        floatBlob: 'floatBlob 12s ease-in-out infinite'
      },
      maxWidth: {
        content: '1200px'
      }
    }
  },
  plugins: []
};
