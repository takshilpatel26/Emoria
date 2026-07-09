import type { Config } from "tailwindcss";

export default {
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      transparent: "transparent",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      card: "hsl(var(--card))",
      "card-foreground": "hsl(var(--card-foreground))",
      popover: "hsl(var(--popover))",
      "popover-foreground": "hsl(var(--popover-foreground))",
      primary: "hsl(var(--primary))",
      "primary-foreground": "hsl(var(--primary-foreground))",
      secondary: "hsl(var(--secondary))",
      "secondary-foreground": "hsl(var(--secondary-foreground))",
      muted: "hsl(var(--muted))",
      "muted-foreground": "hsl(var(--muted-foreground))",
      accent: "hsl(var(--accent))",
      "accent-foreground": "hsl(var(--accent-foreground))",
      destructive: "hsl(var(--destructive))",
      "destructive-foreground": "hsl(var(--destructive-foreground))",
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
    },
    fontFamily: {
      serif: ["Carlton Std", "serif"],
      sans: ["Carlton Std", "serif"],
    },
    extend: {
      transitionDuration: {
        "1800": "1800ms",
      },
      aspectRatio: {
        cinema: "21 / 9",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "roll-up": {
          from: {
            transform: "translateY(100px) scale(0.8)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
        },
        "rotate-path": {
          "0%": {
            transform: "rotate(0deg) translateX(60px) rotate(0deg)",
            opacity: "0",
          },
          "10%": {
            opacity: "1",
          },
          "90%": {
            opacity: "1",
          },
          "100%": {
            transform: "rotate(360deg) translateX(60px) rotate(-360deg)",
            opacity: "0",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-out forwards",
        "fade-out": "fade-out 1s ease-out forwards",
        "roll-up": "roll-up 1.2s ease-out forwards",
        "rotate-path": "rotate-path 2s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
