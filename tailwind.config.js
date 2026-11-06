/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', '"Inter"', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', '"IBM Plex Sans Arabic"', '"Cairo"', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', '"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        xs: ['13px', { lineHeight: '1.6' }],
        sm: ['14px', { lineHeight: '1.65' }],
        base: ['16px', { lineHeight: '1.7' }],
        lg: ['18px', { lineHeight: '1.6' }],
        xl: ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.4' }],
        '3xl': ['30px', { lineHeight: '1.3' }],
      },
      colors: {
        beige: {
          50: '#FDFBF7',
          100: '#FAF7F0',
          200: '#F4EFE6',
          300: '#EBE3D5',
          400: '#DCD1BD',
          500: '#C7B79E',
        },
        stone: {
          850: '#232220',
          900: '#1C1917',
          950: '#121214',
        },
        portal: {
          bg: 'var(--color-bg-app)',
          card: 'var(--color-bg-card)',
          surface: 'var(--color-bg-surface)',
          border: 'var(--color-border)',
          'border-strong': 'var(--color-border-strong)',
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          accent: 'var(--color-accent)',
          'accent-hover': 'var(--color-accent-hover)',
          'accent-bg': 'var(--color-accent-bg)',
          'accent-border': 'var(--color-accent-border)',
          'accent-text': 'var(--color-accent-text)',
        }
      }
    },
  },
  plugins: [],
}
