/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#3b82f6',
        'primary-dark': '#2563eb',
        secondary: '#6366f1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
