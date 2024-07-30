/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors:{
        'lightgreen':'#779556',
        'bc': '#EBECD0',
        'select': '#B9CA43',
      },
    },
  },
  plugins: [],
}
