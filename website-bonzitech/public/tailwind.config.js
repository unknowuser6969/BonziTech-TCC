/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    screens:{
      'sm': {'max': '600px'},
      'large': '1800px',
    },
    fontFamily:{
      'sans': 'sora'
    },
    colors:{
      'white':'#F2F2F2',
      'black':'#1B1B1B',
      'purple':{
        '500':'#8B5CF6',
        '400':'#7C3AED',
        '300':'#1A1821',
        '200':'#110F17',
        '100':'#0B0A0F',
      },
    },
    extend: {
      spacing:{
        'pad': '40rem',
        '192': '54rem',
      },
    },
  },
  plugins: [],
}