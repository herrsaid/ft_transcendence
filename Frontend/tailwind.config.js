/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mn2': {'min': '0px', 'max': '320px'},
      'mn': {'min': '320px', 'max': '640px'},
      'sm': {'min': '640px'},
      'lg': {'min': '1024px'},
      'md': {'min': '768px'},
    },
  },
  plugins: [],
}