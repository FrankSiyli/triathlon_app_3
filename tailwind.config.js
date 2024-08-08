/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    fontSize: {
      s: "0.9rem",
      xs: "0.7rem",
    },
    colors: {
      first: "#f5f4f5",
      second: "#35558287",
      third: "#007CA687",
      fourth: "#00A3B187",
      fifth: "#0a1120",
      alert: "#00A3B1",
      background: "#1d2732",
      green: "#07f53b",
      red: "#f51707",
      blue: "#015695",
      orange: "#e7a420",
      grey: "#eee9e9",
      yellow: "#f7df07",
      lightBlue: "#cedde3",
      purple: "#f00bbb",
    },
  },
  plugins: [require("daisyui")],
};
