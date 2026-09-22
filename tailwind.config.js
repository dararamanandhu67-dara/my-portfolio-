/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cosmic: "#03020b",
        "deep-space": "#070614",
        night: {
          950: "#03020b",
          900: "#070614",
          800: "#0b0a1a",
          700: "#141228",
          600: "#221f3f",
        },
        accent: {
          purple: "#8b5cf6",
          cyan: "#06b6d4",
          blue: "#3b82f6",
          pink: "#d946ef",
          violet: "#a78bfa",
          indigo: "#818cf8",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      animation: {
        "orb-float": "orbFloat 25s ease-in-out infinite alternate",
        "gradient-shift": "gradientShift 6s ease infinite alternate",
        "char-reveal": "charReveal .6s cubic-bezier(.16,1,.3,1) forwards",
        float: "floatY 9s ease-in-out infinite",
      },
      keyframes: {
        orbFloat: {
          "0%": { transform: "translate(0) scale(1)" },
          "50%": { transform: "translate(5%, 10%) scale(1.15)" },
          "100%": { transform: "translate(-5%, -5%) scale(.9)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "100% center" },
        },
        charReveal: {
          "0%": { opacity: "0", filter: "blur(4px)", transform: "translateY(100%) rotateX(-80deg)" },
          "60%": { opacity: "1", filter: "blur(0px)", transform: "translateY(-10%) rotateX(5deg)" },
          "100%": { opacity: "1", filter: "blur(0px)", transform: "translateY(0%) rotateX(0)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
    },
  },
  plugins: [],
};