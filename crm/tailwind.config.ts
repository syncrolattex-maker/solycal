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
        "brand-yellow": "#F1B541",
        "brand-accent": "#E5A52A",
        "brand-dark": "#0a0c0e",
        "brand-black": "#07080a",
        "brand-surface": "#111317",
        "brand-border": "rgba(255, 255, 255, 0.08)",
        "brand-textMuted": "#8E95A2",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        display: ["var(--font-plus-jakarta-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
