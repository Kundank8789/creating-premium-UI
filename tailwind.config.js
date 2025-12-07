/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        peanut: {
          50: "#FFF7EB",
          100: "#FEEBD1",
          200: "#FBD6A4",
          300: "#F4B86B",
          400: "#E5923A",
          500: "#C36B1A",
          600: "#9A5013",
          700: "#72390E",
          800: "#4B2509",
          900: "#2B1505",
        },
      },
      boxShadow: {
        "soft-lg": "0 18px 45px rgba(15, 23, 42, 0.16)",
        "glow-amber": "0 0 80px rgba(245, 158, 11, 0.35)",
      },
      borderRadius: {
        "3xl": "1.75rem",
      },
      backgroundImage: {
        "hero-texture":
          "radial-gradient(circle at 0% 0%, rgba(251, 191, 36, 0.16), transparent 50%), radial-gradient(circle at 100% 100%, rgba(248, 250, 252, 0.8), transparent 55%)",
      },
    },
  },
  plugins: [],
};
