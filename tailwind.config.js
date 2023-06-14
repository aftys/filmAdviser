// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./src/**/**/*.{js,jsx,ts,tsx}",
//     "./src/**/**/**/*.{js,jsx,ts,tsx}",

//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
],
darkMode: 'class',

  theme: {
    extend: {
      colors: {
        redlight: {
          100: "#A33327",
          200: "#a73429",
          500: "#a33327",
        },
        white: "#FFFFFF",
      },
      fontFamily: {
        Hatolie: "Hatolie",
        Collingar: "Collingar",
        Helvetica: "Helvetica",
        Helvetica_bold: "Helvetica-bold",
        Stevens: "Stevens",
      },
      spacing: {
        4.75: "15.28px",
        1.25: "5px",
        298: "204px",
        452: "326px",
        "2xs": "8px",
      },
      keyframes: {
        slidein: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(calc(-208px * 10))" },
        },
        slideout: {
          "0%": { transform: "translateX(calc(-208px * 10))" },
          "100%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        slidein: "slidein 50s linear infinite",
        slideout: "slideout 50s linear infinite",
      },
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"],
  },
  plugins: [],
};