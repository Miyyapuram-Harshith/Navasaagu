/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agri-green': '#14532D',
        'leaf-green': '#22C55E',
        'harvest-yellow': '#F4B942',
        'agri-cream': '#F8FAF5',
        'agri-dark': '#0B1F16',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
