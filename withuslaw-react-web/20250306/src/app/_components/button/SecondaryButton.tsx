"use client";

import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";
import { Size } from "@components/Constants";
import { Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";

type TProps = {
  size: (typeof Size)["Large" | "Medium" | "Small"];
  className?: string;
  children: ReactNode;
} & Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "className"
>;

const { Small, Medium, Large } = Size;

export default function SecondaryButton({
  size,
  onClick,
  children,
  className,
  ...props
}: TProps) {
  const borderRadius =
    size === Large || size === Medium || size === Small
      ? "rounded-xl"
      : "rounded-lg";
  const typographyType = size === Large ? TypographyType.H5 : TypographyType.B2;
  const widthHeight = (function () {
    switch (size) {
      case Large:
        return "w-full py-3";
      case Small:
        return "px-4 py-2";
      case Medium:
        return "px-4 py-1.5";
      default:
        return "";
    }
  })();
  const buttonBg = (function () {
    switch (true) {
      case props.disabled:
        return "bg-kos-gray-200";
      default:
        return "border border-1";
    }
  })();

  return (
    <button
      type="button"
      className={`text-center ${
        size === Small
          ? "bg-kos-orange-500 border-kos-orange-500"
          : "border border-1 border-kos-gray-500 bg-kos-white"
      } ${widthHeight} ${borderRadius} ${buttonBg} ${className ?? ""}`}
      onClick={onClick}
      {...props}
    >
      <Typography
        color={size === Small ? "text-kos-white" : "text-kos-gray-700"}
        type={typographyType}
      >
        {children}
      </Typography>
    </button>
  );
}
