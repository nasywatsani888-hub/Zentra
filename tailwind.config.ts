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
        zentra: {
          dark: "#0F172A",
          card: "#1E293B",
          border: "#334155",
          primary: "#3B82F6",
          warning: "#F59E0B",
          danger: "#EF4444",
          success: "#10B981",
        },
      },
    },
  },
  plugins: [],
};
export default config;
