import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ecff",
          200: "#bcdeff",
          300: "#8ec9ff",
          400: "#59aaff",
          500: "#3387ff",
          600: "#1b66f5",
          700: "#1450e1",
          800: "#1742b6",
          900: "#193c8f",
          950: "#142657",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 12px rgba(20, 62, 150, 0.07)",
        card: "0 4px 24px rgba(20, 62, 150, 0.10)",
        lift: "0 12px 40px rgba(20, 62, 150, 0.16)",
        glow: "0 0 0 6px rgba(51, 135, 255, 0.18), 0 0 20px rgba(51, 135, 255, 0.55)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
