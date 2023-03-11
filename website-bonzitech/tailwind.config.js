/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js}"],
  darkMode: 'class',
  theme: {
    screens:{
      'phone': {'max': '500px'},
      'desktop2': {'max': '1365px'},
      'desktop': {'max': '1366px'},
    },
    fontFamily: {
      'sans': ['poppins'],
    },
    colors:{
      'black':'#101010',
      'grey':'#1B1B1B',
      'white':'#f2f2f2',
      'violet':'#7c3aed',
      'light-violet':'#8b5cf6',
      'green':'#25D366',
      'pink':'#E1306C',
      'blue':'#4078c0',
    },
    extend: {
      transitionDuration:{
        '04': '0.4ms'
      },
      backgroundImage:{
        'hero': "url('../img/bg4.svg')",
      }
    },
  },
  plugins: [],
}