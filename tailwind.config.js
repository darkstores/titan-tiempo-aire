/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      fontFamily: {
        noto: ["NotoSans-Regular"],
        "noto-bold": ["NotoSans-Bold"],
        "noto-semi": ["NotoSans-SemiBold"],
        "noto-light": ["NotoSans-Light"],
        "noto-extralight": ["NotoSans-ExtraLight"],
      },
      colors: {
        main: "#6924ff",
      },
    },
  },
  plugins: [],
};
