const BadgeColorType = {
  blue: "blue",
  green: "green",
  brown: "brown",
  red: "red",
  "orange-white": "orange-white",
  "brown-orange": "brown-orange",
  "gray-white": "gray-white",
  gray: "gray",
} as const;
type BadgeColorType = (typeof BadgeColorType)[keyof typeof BadgeColorType];

const XLarge = "XLarge";
const Size = {
  XLarge: "XLarge",
  Large: "Large",
  Medium: "Medium",
  Small: "Small",
  Tiny: "Tiny",
  Big: "Big",
} as const;
type Size = typeof Size;

const ToastType = {
  success: "success",
  error: "error",
  notice: "notice",
} as const;
type ToastType = typeof ToastType;

export { BadgeColorType, Size, XLarge, ToastType };
