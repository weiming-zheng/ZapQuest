/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // All JavaScript/TypeScript files in the src directory
    "./public/index.html"     ,   // Include your HTML files
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};