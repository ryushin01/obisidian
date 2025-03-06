/**
 * colors
 * size : xxl | xl | l | m | s | xs
 * heading | body
 * fontWeight : bold | semibold | light
 */

/**
 * H1 : Head/Bold/24px
 * H2 : Head/Bold/21px
 * H3 : Head/Semibold/18px
 * H4 : Head/Regular,Number/17px
 * H5 : Head/Semibold/16px
 * H6 : Head/Bold/15px
 * B1 : Body/Medium/16px
 * B2 : Body/Semibold/15px
 * B3 : Body/Medium/15px
 * B4 : Body/Semibold/14px
 * B5 : Body/Medium/13px
 * B6 : Body/Semibold/12px
 */

const TypographyType = {
  H1: "H1" /* H1 : Head/Bold/24px */,
  H2: "H2",
  H3: "H3",
  H4: "H4",
  H5: "H5",
  H6: "H6",
  B1: "B1",
  B2: "B2",
  B3: "B3",
  B4: "B4",
  B5: "B5",
  B6: "B6",
} as const;
type TypographyType = (typeof TypographyType)[keyof typeof TypographyType];

const Typography_Head_Font_Weight = {
  Bold: "font-bold",
  Semibold: "font-semibold",
  Regular: "font-normal",
} as const;
type Typography_Head_Font_Weight =
  (typeof Typography_Head_Font_Weight)[keyof typeof Typography_Head_Font_Weight];

const Typography_Head_Font_Size = {
  "24px": "text-2xl", // XXL
  "21px": "text-[21px]", // XL
  "18px": "text-lg", // L, M
  "17px": "text-[17px]",
  "16px": "text-base", // s
  "15px": "text-[15px]", // xs
} as const;
type Typography_Head_Font_Size =
  (typeof Typography_Head_Font_Size)[keyof typeof Typography_Head_Font_Size];

const Typography_Body_Font_Weight = {
  Medium: "font-medium",
  Semibold: "font-semibold",
} as const;
type Typography_Body_Font_Weight =
  (typeof Typography_Body_Font_Weight)[keyof typeof Typography_Body_Font_Weight];

const Typography_Body_Font_Size = {
  "16px": "text-base", // XXL
  "15px": "text-[15px] leading-[24px]", // XL, L
  "14px": "text-sm", // S
  "13px": "text-[13px]",
  "12px": "text-[12px]",
} as const;
type Typography_Body_Font_Size =
  (typeof Typography_Body_Font_Size)[keyof typeof Typography_Body_Font_Size];

export {
  TypographyType,
  Typography_Head_Font_Size,
  Typography_Head_Font_Weight,
  Typography_Body_Font_Weight,
  Typography_Body_Font_Size,
};
