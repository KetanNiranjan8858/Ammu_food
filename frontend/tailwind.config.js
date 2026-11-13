/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff9eb',
          100: '#feedc7',
          200: '#fddb8a',
          300: '#fbc34d',
          400: '#f9a71a',
          500: '#ee890a',
          600: '#d26705',
          700: '#ab4607',
          800: '#8c360d',
          900: '#732c0f',
          gold: '#D4AF37',
          amber: '#E59819',
          deep: '#B33010',
          crimson: '#881337',
          royal: '#5c0617',
          dark: '#14110F',
          card: '#1F1B18',
          cream: '#FCF8F2',
          sand: '#F5EFE6',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.35)',
        'crimson-glow': '0 0 25px -5px rgba(184, 28, 28, 0.35)',
      },
    },
  },
  plugins: [],
};

