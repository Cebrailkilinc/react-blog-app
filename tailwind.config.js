/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        cinzel:['Cinzel', "serif"],
        radjani:['Ibarra Real Nova', "serif"]
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}