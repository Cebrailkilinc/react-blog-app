/** @type {import('tailwindcss').Config} */


module.exports = {
  content:["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        cinzel:['Cinzel', "serif"],
        radjani:['Ibarra Real Nova', "serif"]
      },
      fontSize: {
        xxs: '0.6rem',
    
    
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
 
  ],
}