"use client";

import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
import { Size } from "@components/Constants";
import { Typography } from "@components";

type TProps = {
  buttonType?: "button" | "submit";
  size: Size["Large" | "Small" | "Tiny" | "Medium" | "XLarge"];
  state?: "Default" | "None" | "On" | "Woori";
  children: ReactNode;
} & Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "className"
>;

/**
 * XL, L, S - w-full, py로 사이즈 조정
 * XS, Tiny - padding으로 width, height 결정
 * state에 따라 text-color 지정
 * size에 따라 Typography option 지정
 *
 */

export default function CtaButton({
  buttonType = "button",
  size,
  state,
  children,
  ...props
}: TProps) {
  if (
    size === Size.XLarge &&
    !(state === "On" || state === "Woori" || props.disabled)
  ) {
    return;
  }
  const buttonBg = (function () {
    switch (true) {
      case props.disabled:
        return "bg-kos-gray-200 border border-1 border-kos-gray-200";
      case state === "None":
        return "bg-kos-white border border-1 border-kos-gray-400";
      case state === "Woori":
        return "bg-woori-brand-color border border-1 border-woori-brand-color";
      default:
        return "bg-kos-orange-500 border border-1 border-kos-orange-500";
    }
  })();
  const buttonSize = (function () {
    switch (size) {
      case "XLarge":
        return "w-full py-4";
      case "Large":
        return "w-full py-3";
      case "Medium":
        return "w-full py-2.5";
      case "Small":
        return "px-3 py-1.5";
      case "Tiny":
        return "px-2 py-1";
      default:
        return "";
    }
  })();
  const textColor =
    (state === "On" && !props.disabled) ||
    state === "Woori" ||
    state === "Default"
      ? "text-kos-white"
      : "text-kos-gray-600";
  const typographyType = (function () {
    switch (size) {
      case Size.XLarge:
        return Typography.TypographyType.H5;
      case Size.Large:
      case Size.Medium:
        return Typography.TypographyType.B2;
      case "Small":
        return Typography.TypographyType.B4;
      case "Tiny":
        return Typography.TypographyType.B5;
      default:
        return Typography.TypographyType.H5;
    }
  })();
  const borderRadius =
    size === Size.XLarge || size === Size.Large || size === Size.Medium
      ? "rounded-xl"
      : "rounded-lg";

  return (
    <button
      type={buttonType}
      className={`text-center ${borderRadius} ${buttonBg} ${buttonSize}`}
      {...props}
    >
      <Typography color={textColor} type={typographyType}>
        {children}
      </Typography>
    </button>
  );
}
