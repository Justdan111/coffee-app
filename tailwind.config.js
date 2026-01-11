/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#C67C4E",
        secondary: "#1A1A1A",
        success: "#36C07E",
        coffee: {
          dark: "#2D2D2D",
          light: "#EDD6C8",
        },
      },
    },
  },
  plugins: [],
}