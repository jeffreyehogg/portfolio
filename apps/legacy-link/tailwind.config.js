/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'SF Mono', 'Menlo', 'Fira Code', 'monospace'],
        default: ['var(--font-inter)'],
      },
      colors: {
        slate: {
          850: '#111827',
          900: '#0f172a',
          950: '#020617',
        },
      },
      boxShadow: {
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glow-indigo': '0 0 25px -3px rgba(99, 102, 241, 0.3)',
        'glow-cyan': '0 0 25px -3px rgba(34, 211, 238, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
