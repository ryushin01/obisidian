import React, { ReactNode } from "react";
import { Size } from "@components/Constants";
import { Typography } from "@components";

type TProps = {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  size: Size["Medium" | "Small"];
  children: string | string[];
  state?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function TextButton({
  icon,
  iconPosition,
  size,
  state,
  onClick,
  children,
}: TProps) {
  const typographyType =
    !!icon || size === "Small"
      ? Typography.TypographyType.B4
      : Typography.TypographyType.H5;
  const fontColor = !!icon
    ? "text-kos-gray-600"
    : state
    ? "text-kos-orange-500"
    : "text-kos-gray-500";

  return (
    <button
      type="button"
      className="border-none outline-none flex items-center"
      onClick={onClick}
    >
      {icon && iconPosition === "left" && icon}
      <Typography type={typographyType} color={fontColor}>
        {children}
      </Typography>
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
