import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        text: 'var(--color-text)',
        background: 'var(--color-background)',
        'background-lighter': 'var(--color-background-lighter)',
        entry: 'var(--color-entry)',
        'entry-hover': 'var(--color-entry-hover)',
        input: 'var(--color-input)'
      }
    },
  },
  plugins: [],
}
export default config
