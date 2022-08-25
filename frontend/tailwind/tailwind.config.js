/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/app/**/*.{vue,js}",
    "./frontend/tailwind/core.css",
    "./views/*.pug"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
