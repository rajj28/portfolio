import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FAFAFA", // Ultra clean white
        secondary: "#18181B", // Bold black
        accent: "#0EA5E9", // Electric blue - the "crazy" element
        accentDark: "#0284C7", // Darker blue for hover
        heading: "#09090B", // Pure black for headings
        body: "#3F3F46", // Charcoal for text
        textLight: "#71717A", // Gray for subtle text
        cardBg: "#FFFFFF", // Pure white cards
        border: "#E4E4E7", // Subtle border
        borderDark: "#D4D4D8", // Darker border
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in": "slideIn 0.6s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #06B6D4, 0 0 10px #06B6D4" },
          "100%": { boxShadow: "0 0 10px #06B6D4, 0 0 20px #06B6D4, 0 0 30px #06B6D4" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
