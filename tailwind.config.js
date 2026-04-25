/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface:    'rgb(var(--color-surface) / <alpha-value>)',
        surface2:   'rgb(var(--color-surface2) / <alpha-value>)',
        surface3:   'rgb(var(--color-surface3) / <alpha-value>)',
        border:     'rgb(var(--color-border) / <alpha-value>)',
        primary:    'rgb(var(--color-primary) / <alpha-value>)',
        muted:      'rgb(var(--color-muted) / <alpha-value>)',
        accent: {
          blue:  'rgb(var(--color-accent-blue) / <alpha-value>)',
          green: 'rgb(var(--color-accent-green) / <alpha-value>)',
          amber: 'rgb(var(--color-accent-amber) / <alpha-value>)',
          red:   'rgb(var(--color-accent-red) / <alpha-value>)',
        }
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.2)',
        'glow-blue':  '0 0 20px rgba(59, 130, 246, 0.2)',
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
