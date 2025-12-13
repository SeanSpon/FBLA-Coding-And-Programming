/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC2626',
          red: '#DC2626',
        },
        secondary: '#FFFFFF',
        cream: '#FFFFFF',
        accent: '#EF4444',
        text: {
          DEFAULT: '#1A1A1A',
          light: '#666666',
        },
        border: '#FEE2E2',
        sage: '#CDE1D1',
        sky: '#BFD8F2',
        blush: '#F7C8D0',
        charcoal: '#2F2F2F',
        'warm-gray': '#8C8C8C',
      },
      fontFamily: {
        heading: ['Inter', 'Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}