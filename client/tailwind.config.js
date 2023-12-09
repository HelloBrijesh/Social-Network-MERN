/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#1877F2",
        "white-smoke": "#f0f2f5",
      },
      fontFamily: {
        custom: [
          "Segoe UI Historic",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
    backgroundImage: {
      "cover-image": "url('/profileImage.jpg')",
    },
  },
  plugins: [],
};
