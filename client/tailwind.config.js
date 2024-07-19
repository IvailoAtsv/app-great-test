/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors:{
        whiteBg:'#f5f5f5',
        accent:'#1053BF',
        accentLight:'#D9E6FA',
        black:'#000',
      },
      fontSize:{
        h1clamp: "clamp(2.5rem, 4.5vw, 5.5rem)",
      }
    },
  },
  plugins: [],
}