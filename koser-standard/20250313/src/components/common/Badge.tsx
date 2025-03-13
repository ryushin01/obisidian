import React, { ReactNode } from "react";
import Typography from "./Typography";

type TProps = {
  colorType: "active" | "default";
  children: ReactNode;
};

/* TODO: colorType constants화 필요한지 고민해보기, children이 1000이상이면 +999로 표시되게 하기! */

const getClassName = (colorType: string) => {
  const defaultClassName =
    "_flex-center px-1 py-1 rounded-full whitespace-nowrap max-w-24 min-w-8";
  switch (colorType) {
    case "active":
      return `${defaultClassName} bg-koser-main-100 text-koser-grayscale-0`;

    case "default":
      return `${defaultClassName} bg-koser-grayscale-40 text-koser-grayscale-80`;

    default:
      return defaultClassName;
  }
};
export default function Badge({ colorType, children }: TProps) {
  const className = getClassName(colorType);

  return (
    <div className={className}>
      <Typography kind="caption-large">{children}</Typography>
    </div>
  );
}
