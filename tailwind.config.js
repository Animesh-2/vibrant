/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/store/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "light-bg": "url('/assets/bg-light.png')",
        "dark-bg": "linear-gradient(180deg, #0D1117 0.21%, #2B3647 99.79%)",
        // 💜 Custom
        "gradient-purple": "linear-gradient(to right, #8b5cf6, #6366f1)",
      },
      colors: {
        gray: {
          500: "#F8F8F81A",
          400: "#F8F8F880",
          300: "#f8f8f80a"
        },
        main: "#70707033",
        purple : "#9333EA",
        green : "#10B981",
        darkBlue : "#172648",
        borderColor: "#F8F8F840",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
      },
    },
  },
  plugins: [],
};
