import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        black: "#31363B",
        yellow: "#FDC435",
        lightyellow: "#FFFAD8",
        gray: "#828282"
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"], // Montserrat 글꼴 설정
      },
    },
  },
  plugins: [],
} satisfies Config;
