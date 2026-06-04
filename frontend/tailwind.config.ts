import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "rgba(0,0,0,0.06)",
        input: "transparent",
        ring: "#8B5CF6",
        background: "#F6F7FB",
        foreground: "#0F172A",
        primary: {
          DEFAULT: "#0F172A",
          50: "#F1F5F9",
          100: "#E2E8F0",
          200: "#CBD5E1",
          300: "#94A3B8",
          400: "#64748B",
          500: "#475569",
          600: "#334155",
          700: "#1E293B",
          800: "#0F172A",
          900: "#020617",
        },
        secondary: {
          DEFAULT: "#F1F5F9",
          foreground: "#0F172A",
        },
        accent: {
          DEFAULT: "#EDE9FE",
          foreground: "#0F172A",
        },
        muted: {
          DEFAULT: "#F1F5F9",
          foreground: "#64748B",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#0F172A",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#ffffff",
        },
        sidebar: {
          DEFAULT: "#ffffff",
          foreground: "#0F172A",
          accent: "#F8FAFC",
          "accent-foreground": "#0F172A",
          border: "rgba(0,0,0,0.06)",
          ring: "#8B5CF6",
        },
        premium: {
          mint: "#10B981",
          "mint-light": "#D1FAE5",
          purple: "#8B5CF6",
          "purple-light": "#EDE9FE",
          blue: "#3B82F6",
          "blue-light": "#DBEAFE",
          orange: "#F59E0B",
          "orange-light": "#FEF3C7",
          pink: "#EC4899",
          "pink-light": "#FCE7F3",
        },
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
      },
      boxShadow: {
        soft: "0px 8px 24px rgba(0,0,0,0.03)",
      },
      letterSpacing: {
        "tight-1": "-0.01em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        float2: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        float: "float 4s ease-in-out infinite",
        float2: "float2 5s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
