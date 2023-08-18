// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        "1/4vw": "25vw",
        "1/2vw": "50vw",
        "3/4vw": "75vw",
        fullvw: "100vw",
      },
      height: {
        "1/4vh": "25vh",
        "1/2vh": "50vh",
        "3/4vh": "75vh",
        fullvh: "100vh",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
