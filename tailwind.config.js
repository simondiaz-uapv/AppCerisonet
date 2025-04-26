/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E6F50',  
        secondary: '#4BAF7E', 
        text: '#F1F7ED', 
        background: '#D9EAD3', 
        hover: '#3E8E64', 
      },
    },
  },
  plugins: [],
}

