// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: 'class', // 👈 enables class-based dark mode
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('tailwind-scrollbar'),
//   ],
//   variants: {
//     scrollbar: ['rounded'], // 👈 allows rounded scrollbar
//   },
// }



/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Enable manual class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
}

