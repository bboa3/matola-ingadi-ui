/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx}",,
    "./common/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        market: 'market 20s linear infinite'
      },
      colors: {
        green: {
          50: '#f0fce9',
          100: '#ddf7d0',
          200: '#bef0a6',
          300: '#95e472',
          400: '#7ed957',
          500: '#50bb27',
          600: '#3c951b',
          700: '#2f7219',
          800: '#295a1a',
          900: '#264d1a',
          950: '#0f2a09',
        }
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

