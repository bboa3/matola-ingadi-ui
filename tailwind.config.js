const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx}",,
    "./elements/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        market: 'market 20s linear infinite'
      },
      keyframes: {
        market: {
          '0%': { 
            left: 0
          },
          '100%': {
            left: '-100%'
          }
        }
      },
      screens: {
        'sm': '476px',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}

