/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F7F4EF',
        paper: '#EFE9DF',
        ink: '#1A1A1A',
        gold: '#C79B52',
        clay: '#A86C4A',
        forest: '#55654F',
        dark: '#111111',
      },
      fontFamily: {
        serif: ['"Noto Serif JP"', 'serif'],
        sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1440px',
        prose: '680px',
      },
      borderRadius: {
        card: '18px',
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      transitionTimingFunction: {
        // GSAP power3.out ≈ this cubic-bezier
        soft: 'cubic-bezier(0.16, 1, 0.3, 1)',
        inout: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      boxShadow: {
        card: '0 10px 40px -12px rgba(26,26,26,0.18)',
        cardHover: '0 28px 60px -18px rgba(26,26,26,0.32)',
      },
    },
  },
  plugins: [],
}
