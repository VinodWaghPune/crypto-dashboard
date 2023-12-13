/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkBackground: '#1a1a1a',
        darkText: '#fff',
      },
    },
  },
  plugins: [require('daisyui')],
}