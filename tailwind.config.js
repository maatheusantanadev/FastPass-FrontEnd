/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cobalt: {
          DEFAULT: "#2B50FF",
          dark: "#1E3AD6",
          soft: "#C9D4FF",
          tint: "#EEF1FF",
        },
        ink: "#0E1330",
        muted: "#6B7191",
        line: "#E7EAF6",
        success: "#16B26A",
      },
      fontFamily: {
        display: ["Jost", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        badge: "0.32em",
      },
      boxShadow: {
        field: "0 1px 2px rgba(14, 19, 48, 0.04)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
