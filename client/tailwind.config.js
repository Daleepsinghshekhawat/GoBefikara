/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        saffron: '#FF6B35',
        midnight: '#0F1337',
        navy: '#1E2462',
        gold: '#F4C542',
      },
    },
  },
  plugins: [],
}
