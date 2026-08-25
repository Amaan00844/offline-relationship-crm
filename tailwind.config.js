/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#04060A',
          900: '#080B11',
          850: '#0C1018',
          800: '#111723',
          750: '#172030',
          700: '#1F2A3F',
          600: '#334155',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F8FAFC'
        },
        club: {
          gold: '#E5C07B',
          goldDark: '#D4AF37',
          goldMuted: 'rgba(229, 192, 123, 0.15)',
          emerald: '#10B981',
          emeraldMuted: 'rgba(16, 185, 129, 0.15)',
          violet: '#8B5CF6',
          violetMuted: 'rgba(139, 92, 246, 0.15)',
          cyan: '#06B6D4',
          rose: '#F43F5E',
          accent: '#6366F1'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 20px 2px rgba(99, 102, 241, 0.15)',
        'gold-glow': '0 0 25px rgba(229, 192, 123, 0.2)',
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.2)',
        'violet-glow': '0 0 25px rgba(139, 92, 246, 0.2)'
      },
      backgroundImage: {
        'radial-hero': 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.12) 0%, rgba(8, 11, 17, 0) 70%)',
        'radial-gold': 'radial-gradient(circle at 100% 0%, rgba(229, 192, 123, 0.08) 0%, rgba(8, 11, 17, 0) 60%)',
        'card-gradient': 'linear-gradient(180deg, rgba(17, 23, 35, 0.7) 0%, rgba(12, 16, 24, 0.8) 100%)',
        'luxury-border': 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)'
      }
    },
  },
  plugins: [],
}
