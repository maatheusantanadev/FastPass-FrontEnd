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
        danger: "#E5484D",
        warning: "#E8A33D",
        night: "#080B1C",
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
        card: "0 12px 40px -18px rgba(14, 19, 48, 0.22)",
        phone: "0 40px 90px -30px rgba(14, 19, 48, 0.55)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-46px)", opacity: "0" },
          "10%, 90%": { opacity: "1" },
          "100%": { transform: "translateY(46px)", opacity: "0" },
        },
      },
      animation: {
        scanline: "scanline 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
