/* eslint-env node */
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
          primary: "#2563EB",
          secondary: "#3B82F6",
          accent: "#06B6D4",
          neutral: "#18181B",
          "base-100": "#09090B",
          "base-200": "#18181B",
          "base-300": "#27272A",
          info: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],
  },
};
