/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        chatdark: {
          primary: "#6D28D9",
          secondary: "#A78BFA",
          accent: "#2DD4BF",
          neutral: "#1E1B2E",
          "base-100": "#0F0D1A",
          "base-200": "#1A172B",
          "base-300": "#262040",
          info: "#3B82F6",
          success: "#22C55E",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],
  },
};
