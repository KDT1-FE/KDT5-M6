/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '1080px'
    },
    extend: {
      backgroundImage: {},
      colors: {
        forsythia: '#F8D681'
      }
    }
  },
  plugins: []
}
