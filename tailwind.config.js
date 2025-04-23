/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html'
    ],
    theme: {
      extend: {
        fontFamily: {
          lato: ["Lato", "sans-serif"],
          open: ["Open Sans", 'sans-serif'],
          bebas: ["Bebas Neue", 'sans-serif'],
        },
        colors: {
          dorado: '#b88156',
          navy: '#1d2737',
          azulProfundo: '#0c2d48',
          celeste: '#1d8dce',
          grisOscuro: '#181a1e',
          negro: '#000000',
        },
      },
    },
  plugins: [],
}
