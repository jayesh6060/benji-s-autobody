/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#F8FAFC',
          card: '#FFFFFF',
          hover: '#F1F5F9',
          border: '#E2E8F0',
          muted: '#64748B',
        },
        brand: {
          orange: '#2563EB',
          orangeHover: '#1D4ED8',
          glow: 'rgba(37, 99, 235, 0.25)',
          red: '#0284C7',
          darkRed: '#0369A1',
        },
        aqua: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          accent: '#2563EB',
          sky: '#0284C7',
          deep: '#090D16',
          navy: '#0F172A',
          subtle: '#EFF6FF',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-oswald)', 'sans-serif'],
        oswald: ['var(--font-oswald)', 'sans-serif'],
        alfa: ['var(--font-alfa)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
