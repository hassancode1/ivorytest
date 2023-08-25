/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#3B68E7',
        primaryBtn:"#212130",
      },
    },
  },
  plugins: [],
}

