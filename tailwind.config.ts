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
        background: "#F9FAFF",
        black: "#31363B",
        yellow: "#FDC435",
        lightyellow: "#FFFAD8",
        gray: "#828282",
        orange: "#FF7342",
        lightorange: "#FFD09B"
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },

      transitionDuration: {
        '600': '600ms',
      },
      transitionTimingFunction: {
        'in-out': 'ease-in-out',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '5': '5',
        '100': '100',
      }
    },
  },
  plugins: [],
} satisfies Config;