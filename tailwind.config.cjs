/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          0: "#1E1E1E",
          10: "#0a0909",
          20: "#3D1766",
          30: "#6F1AB6",
          40: "#FF0032",
          50: "#CD0404",
          60: "#54E50F",
        },
      },
    },
  },
  plugins: [],
};
