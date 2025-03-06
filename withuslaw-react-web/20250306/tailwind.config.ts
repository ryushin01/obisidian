import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "60px": "3.75rem",
        "13": "3.25rem" /* 52px */,
      },
      bottom: {
        "2.125rem": "2.125rem",
      },
      fontSize: {
        "13px": "0.813rem",
        "15px": "0.938rem",
        "17px": "1.063rem",
        "21px": "1.313rem",
      },
      boxShadow: {
        inputFocus: "0px 1px 20px 0px #FFEDD3",
        tabList:
          "87px 101px 37px 0px rgba(161, 161, 161, 0.00), 14px 16px 21px 0px rgba(161, 161, 161, 0.09), 3px 4px 12px 0px rgba(161, 161, 161, 0.10)",
      },
      borderRadius: {
        "20px": "20px",
      },
      backgroundImage: {
        "down-arrow": "url('/icon/DownArrow.svg')",
        "checkbox-big-on": "url('/icon/CheckBoxBigOn.svg')",
        "checkbox-big-off": "url('/icon/CheckBoxBigOff.svg')",
      },
      colors: {
        woori: {
          "brand-color": "#007BC8",
        },
        kos: {
          "brand-900": "#231916",
          /* orange */
          "orange-600": "#E28700",
          "orange-500": "#FF9900",
          "orange-300": "#FFBE5C",
          "orange-100": "#FFE2B8",
          "orange-50": "#FFF8EE",
          /* brown */
          "brown-500": "#231916",
          "brown-300": "#4F4745",
          "brown-100": "#9F9793",
          "brown-50": "#E0D9D5",
          /* blue */
          "blue-600": "#1754b2",
          "blue-500": "#1A61CD",
          "blue-400": "#508ce9",
          "blue-300": "#74a4ed",
          "blue-200": "#e1ebfb",
          "blue-100": "#F2F7FF",
          /* green */
          "green-600": "#228200",
          "green-500": "#2AA100",
          "green-300": "#4CCB1F",
          "green-200": "#8BE56C",
          "green-100": "#F0FBEB",
          /* red */
          "red-500": "#E33F28",
          "red-300": "#ec7f70",
          "red-100": "#fbe0dc",
          /* yellow */
          "yellow-800": "#83785B",
          "yellow-700": "#d19f00",
          "yellow-500": "#FABE00",
          "yellow-300": "#ffd44d",
          "yellow-100": "#FFF9E6",
          /* gray */
          "gray-40": "#D4D4D8",
          "gray-100": "#F6F6F6",
          "gray-200": "#f0f0f0",
          "gray-300": "#EAEAEA",
          "gray-400": "#D9D9D9",
          "gray-500": "#a3a3a3",
          "gray-600": "#7D7D7D",
          "gray-700": "#545454",
          "gray-800": "#2E2E2E",
          white: "#FFF",
          black: "#121212",
          "logo-brown": "#231916",
          "tab-bg": "#EAEAEA",
          "dim-60": "rgba(18,18,18,0.6)",
          body: "#7D7D7D",
          disable: "#a3a3a3",
          transparent: "transparent",
        },
      },
      padding: {
        "11px": "11px",
        "4.5": "1.125rem",
        "15": "3.75rem",
        "9px": "9px",
        "15px": "15px",
      },
      zIndex: {
        // react-modal-sheet 패키지의 z-index 수정 방법 확인 전까지 사용할 임시값
        "10000000": "10000000",
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".typography-h1": {
          "@apply text-xxl": "",
        },
      });
    }),
  ],
};
export default config;
