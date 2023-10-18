/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './**/*.{vue,js,html}'],
  theme: {
    extend: {
      colors: {
        "default-dark": "#1a1a1a",
        "lighten-dark": "#242424"
      }
    },
  },
  plugins: [],
}

