/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "admin-palette-black": "#263238",
        "admin-palette-light-gray": "#f5f5f5",
        "admin-palette-blue": "#0288d1",
        "admin-palette-green": "#388e3c",
        "admin-palette-red": "#d32f2f",
      },
    },
  },
  plugins: [],
}
