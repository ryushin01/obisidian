import { ReactNode, createElement } from "react";
import {
  TypographyType,
  Typography_Body_Font_Size,
  Typography_Body_Font_Weight,
  Typography_Head_Font_Size,
  Typography_Head_Font_Weight,
} from "@components/typography/Constant";

export type TTypographyProps = {
  color: string;
  type: TypographyType;
  children: ReactNode;
  className?: string;
};

export default function Typography({
  color = "kos-gray-800",
  type,
  className,
  children,
}: TTypographyProps) {
  let customTag = "";
  let combinedClassName = "";
  switch (type) {
    case TypographyType.H1:
      customTag = "h1";
      combinedClassName = `${Typography_Head_Font_Size["24px"]} ${Typography_Head_Font_Weight.Bold} `;
      break;
    case TypographyType.H2:
      customTag = "h2";
      combinedClassName = `${Typography_Head_Font_Size["21px"]} ${Typography_Head_Font_Weight.Bold} `;
      break;
    case TypographyType.H3:
      customTag = "h3";
      combinedClassName = `${Typography_Head_Font_Size["18px"]} ${Typography_Head_Font_Weight.Semibold}`;
      break;
    case TypographyType.H4:
      customTag = "h4";
      combinedClassName = `${Typography_Head_Font_Size["17px"]} ${Typography_Head_Font_Weight.Regular}`;
      break;
    case TypographyType.H5:
      customTag = "h5";
      combinedClassName = `${Typography_Head_Font_Size["16px"]} ${Typography_Head_Font_Weight.Semibold}`;
      break;
    case TypographyType.H6:
      customTag = "h6";
      combinedClassName = `${Typography_Head_Font_Size["15px"]} ${Typography_Head_Font_Weight.Bold}`;
      break;
    case TypographyType.B1:
      customTag = "p";
      combinedClassName = `${Typography_Body_Font_Size["16px"]} ${Typography_Body_Font_Weight.Medium}`;
      break;
    case TypographyType.B2:
      customTag = "p";
      combinedClassName = `${Typography_Body_Font_Size["15px"]} ${Typography_Body_Font_Weight.Semibold}`;
      break;
    case TypographyType.B3:
      customTag = "p";
      combinedClassName = `${Typography_Body_Font_Size["15px"]} ${Typography_Body_Font_Weight.Medium}`;
      break;
    case TypographyType.B4:
      customTag = "p";
      combinedClassName = `${Typography_Body_Font_Size["14px"]} ${Typography_Body_Font_Weight.Semibold}`;
      break;
    case TypographyType.B5:
      customTag = "p";
      combinedClassName = `${Typography_Body_Font_Size["13px"]} ${Typography_Body_Font_Weight.Medium}`;
      break;
    case TypographyType.B6:
      customTag = "p";
      combinedClassName = `${Typography_Body_Font_Size["12px"]} ${Typography_Body_Font_Weight.Semibold}`;
      break;
  }

  return createElement(
    customTag,
    {
      className: `${
        className?.includes("truncate") ? "" : "whitespace-break-spaces"
      } ${combinedClassName} ${className ?? ""} ${color}`,
    },
    children
  );
}

Typography.TypographyType = TypographyType;
