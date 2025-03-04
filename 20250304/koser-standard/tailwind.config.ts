import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        koser: {
          primary: {
            "100": "#113662",
            "90": "#2b4378",
            "80": "#15448b",
            "70": "#0b56a7",
            "60": "#4479ae",
            "50": "#5f91c2",
            "40": "#d6e3eb",
            "30": "#d2e4fa",
            "20": "#edf4f8",
            "10": "#eff7ff",
            "0": "#f5f7f8",
          },
          grayscale: {
            "100": "#111111",
            "90": "#505050",
            "80": "#767676",
            "70": "#999999",
            "60": "#aaaaaa",
            "50": "#bdbdbd",
            "40": "#d4d4d4",
            "30": "#ededed",
            "20": "#f1f1f5",
            "10": "#f8f8fa",
            "0": "#ffffff",
          },
          secondary: {
            bluegray: {
              "50": "#505b9e",
              "30": "#6c77b5",
            },
            yellow: {
              "50": "#d8a100",
              "30": "#fabe00",
              "10": "#faebbd",
            },
            red: {
              "50": "#e74c38",
              "10": "#fce0db",
            },
          },
        },
      },
      zIndex: {
        // NOTE: Design System > Elevation
        // 1: gnb
        "1": "1",
        // 10: header, footer, modal backdrop
        "10": "10",
        // 100: portal, modal container
        "100": "100",
        // 1000: tooltip, toast
        "1000": "1000",
        // 10000: loading, spinner-backdrop
        "10000": "10000",
      },
      animation: {
        drawer: "drawer 0.3s cubic-bezier(0.65, 0.05, 0.35, 1) backwards",
      },
      keyframes: {
        drawer: {
          "0%": { right: "-100%" },
          "100%": { right: "0%" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
