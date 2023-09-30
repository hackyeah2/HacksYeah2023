/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      'light-gray': '#d9d9d9',
      'light-blue': '#65a3ff',
      'light-stone': '#e0e3e8',
    },
  },
  plugins: [],
}

