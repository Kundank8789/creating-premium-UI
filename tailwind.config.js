module.exports = {
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c76b12'
      },
      boxShadow: {
        'soft-lg': '0 20px 40px rgba(13,12,11,0.12)',
        'glow': '0 6px 30px rgba(200,110,30,0.22)'
      }
    }
  },
  plugins: [],
}
