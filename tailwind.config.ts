import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0066FF", // Vibrant blue as primary color
          foreground: "hsl(var(--primary-foreground))",
          50: "#E6F0FF",
          100: "#CCE0FF",
          200: "#99C2FF",
          300: "#66A3FF",
          400: "#3385FF",
          500: "#0066FF",
          600: "#0052CC",
          700: "#003D99",
          800: "#002966",
          900: "#001433",
        },
        secondary: {
          DEFAULT: "#FF3366", // Vibrant pink as secondary color
          foreground: "hsl(var(--secondary-foreground))",
          50: "#FFE6EC",
          100: "#FFCCD9",
          200: "#FF99B3",
          300: "#FF668C",
          400: "#FF3366",
          500: "#FF0040",
          600: "#CC0033",
          700: "#990026",
          800: "#66001A",
          900: "#33000D",
        },
        success: {
          DEFAULT: "#00CC88", // Vibrant green for success states
          50: "#E6FFF5",
          100: "#CCFFEB",
          200: "#99FFD6",
          300: "#66FFC2",
          400: "#33FFAD",
          500: "#00FF99",
          600: "#00CC7A",
          700: "#00995C",
          800: "#00663D",
          900: "#00331F",
        },
        warning: {
          DEFAULT: "#FFCC00", // Vibrant yellow for warning states
          50: "#FFFCE6",
          100: "#FFF9CC",
          200: "#FFF399",
          300: "#FFED66",
          400: "#FFE633",
          500: "#FFCC00",
          600: "#CCA300",
          700: "#997A00",
          800: "#665200",
          900: "#332900",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
      },
      boxShadow: {
        smooth: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
        "smooth-lg": "0 20px 40px -15px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideUp: "slideUp 0.4s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

