import React, { ReactNode } from "react";
import { Typography } from "@components";

type TProps = {
  bgColor: string;
  textColor: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export default function FullRoundedButton({
  bgColor,
  textColor,
  className,
  onClick,
  children,
}: TProps) {
  return (
    <button
      type="button"
      className={`px-5 py-3 rounded-full ${className} ${bgColor}`}
      onClick={onClick}
      style={{
        boxShadow:
          "3px 4px 12px 0px rgba(161, 161, 161, 0.10), 14px 16px 21px 0px rgba(161, 161, 161, 0.09), 87px 101px 37px 0px rgba(161, 161, 161, 0.00)",
      }}
    >
      <Typography color={textColor} type={Typography.TypographyType.B1}>
        {children}
      </Typography>
    </button>
  );
}
