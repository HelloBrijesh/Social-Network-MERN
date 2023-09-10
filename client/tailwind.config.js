/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#1877F2",
        "white-smoke": "#F6F6F6",
      },
    },
  },
  plugins: [],
};