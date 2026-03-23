import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: ['scroll-mt-28', 'blur-sm', 'filter'],
  theme: {
    extend: {
      colors: {
        white:          '#FFFFFF',
        cream:          '#F5EFE4',
        'warm-sand':    '#E8DCC8',
        tan:            '#C4A47C',
        'brown-light':  '#8C6440',
        'brown-mid':    '#5E3D20',
        'brown-deep':   '#3A1E08',
        'brown-dark':   '#1A0C02',
        'text-primary': '#180A00',
        'text-muted':   '#6B5240',
        gold:           '#B8821E',
        'gold-light':   '#D4A040',
        'gold-dim':     '#8A6018',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        jost:      ['var(--font-jost)', 'system-ui', 'sans-serif'],
        lora:      ['var(--font-lora)', 'Georgia', 'serif'],
      },
      animation: {
        marquee:   'marquee 50s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
