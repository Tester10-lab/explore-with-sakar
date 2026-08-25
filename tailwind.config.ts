import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#FCFAF6",
          100: "#FBF8F2",
          200: "#F5EFEB",
          300: "#EFE5DC",
          400: "#E3D3C4",
          500: "#D4BFA9",
        },
        sand: {
          light: "#F7F2EA",
          DEFAULT: "#F3ECE0",
          dark: "#E8DEC9",
        },
        terracotta: {
          light: "#D46250",
          DEFAULT: "#C14936",
          dark: "#9E3423",
          deep: "#7C2517",
        },
        saffron: {
          light: "#F3B556",
          DEFAULT: "#E59F38",
          dark: "#C67F1F",
        },
        himalaya: {
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#BCCCDC",
          700: "#334E68",
          800: "#243B53",
          900: "#192026",
          950: "#0F1419",
        },
        moss: {
          light: "#4E735D",
          DEFAULT: "#3B5947",
          dark: "#2A4033",
        },
        prayer: {
          blue: "#2B5C8F",
          white: "#F5F5F5",
          red: "#C14936",
          green: "#3B5947",
          yellow: "#E59F38",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(25, 32, 38, 0.04)",
        warm: "0 10px 30px -10px rgba(193, 73, 54, 0.12)",
        editorial: "0 20px 40px -15px rgba(25, 32, 38, 0.08)",
        floating: "0 30px 60px -20px rgba(25, 32, 38, 0.18)",
      },
      backgroundImage: {
        "parchment-gradient": "linear-gradient(180deg, #FBF8F2 0%, #F5EFEB 100%)",
        "dusk-gradient": "linear-gradient(180deg, rgba(25, 32, 38, 0.8) 0%, rgba(25, 32, 38, 0.95) 100%)",
        "hero-overlay": "linear-gradient(180deg, rgba(25, 32, 38, 0.35) 0%, rgba(25, 32, 38, 0.75) 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
