/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#D64545',
        'cream': '#FFF6E9',
        'sage': '#CDE1D1',
        'sky': '#BFD8F2',
        'blush': '#F7C8D0',
        'charcoal': '#2F2F2F',
        'warm-gray': '#8C8C8C',
      },
      fontFamily: {
        heading: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}