module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '2px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
