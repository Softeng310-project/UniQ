/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'uniq-blue': '#1e40af',
        'uniq-light-blue': '#3b82f6',
        'uniq-dark': '#1f2937',
      },
    },
  },
  plugins: [],
}
