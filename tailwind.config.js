/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./components/**/*.{html,ts,tsx,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        pricolor: '#EE1B24',
        seccolor: '#01426A',
        accent: '#FFD4D4',
        background: '#F9FAFB',
        icons: '#FF7350',
        accentBlue: '#038FCF',
        aiqdark: '#1B1B4c',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
    
  },
  plugins: [],
}
