import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        brand: {
          indigo: "#3B2FD4",
          cyan: "#22D3EE",
          charcoal: "#0F0F17",
          offwhite: "#F7F7FB",
          violet: "#8B5CF6",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Geist", "Inter", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      borderRadius: {
        card: "0.875rem",
      },
      boxShadow: {
        "light-card": "0 8px 24px rgba(15, 15, 23, 0.06)",
      },
    },
  },
  plugins: [forms],
};

export default config;
