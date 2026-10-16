import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand: Sage #5F8B4C · Cream #FFDDAB · Coral #FF9A9A · Terracotta #945034
        canvas: "#FCF6EC",
        paper: "#FFFDF9",
        ink: "#2B2A24",
        muted: "#6B655B",
        sage: {
          50: "#F2F6EF",
          100: "#E3ECDD",
          200: "#C7D8BC",
          300: "#A2BF92",
          400: "#7FA56B",
          500: "#5F8B4C",
          600: "#4E7540",
          700: "#3E5F33",
          800: "#2F4927",
          900: "#22361D",
        },
        cream: {
          50: "#FFFBF4",
          100: "#FFF4E2",
          200: "#FFEACB",
          300: "#FFDDAB",
          400: "#F5C98A",
        },
        coral: {
          50: "#FFF3F2",
          100: "#FFE4E3",
          200: "#FFC6C6",
          300: "#FF9A9A",
          400: "#F27E7E",
          // Deeper coral used where coral carries TEXT, for WCAG contrast on cream
          600: "#C8504F",
          700: "#A63F3E",
        },
        terra: {
          100: "#F3E3DA",
          200: "#E2C1AF",
          300: "#C48B6F",
          500: "#945034",
          600: "#7D432B",
          700: "#653622",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(60, 40, 20, 0.04), 0 4px 16px -4px rgba(60, 40, 20, 0.08)",
        lift: "0 2px 4px rgba(60, 40, 20, 0.05), 0 18px 36px -12px rgba(60, 40, 20, 0.18)",
      },
      borderRadius: {
        card: "1.25rem",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.35", transform: "scale(0.8) rotate(0deg)" },
          "50%": { opacity: "1", transform: "scale(1) rotate(12deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        twinkle: "twinkle 3.2s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out both",
        "spin-slow": "spin-slow 60s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
