/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,html}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Fira: ["Fira Sans", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      Source: ["Source Sans Pro", "sans-serif"],
      Ubuntu: ["Ubuntu Mono", "monospace"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
    },
  },
  plugins: [],
};
