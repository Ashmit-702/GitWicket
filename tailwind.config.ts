import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pitch: "#14301F", // deep pitch green — dark surfaces
        turf: "#2F6B3C", // mid green — accents, borders
        chalk: "#F4F1E8", // off-white — card face, light surfaces
        leather: "#A6402A", // worn cricket-ball red — highlight / danger tier
        bail: "#C79A3E", // bail gold — premium stat numbers, legend tier
        ink: "#1B1B18", // near-black text
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
