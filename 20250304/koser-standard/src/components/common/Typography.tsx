import { ElementType } from "react";

interface TypographyProps {
  as?: ElementType;
  isBold?: boolean;
  kind: "headline-large" | "headline-medium" | "headline-small" | "title-large" | "title-medium" | "title-small" | "body-large" | "body-medium" | "body-small" | "caption-large" | "caption-medium" | "caption-small";
  children: string;
}

/**
 * @name Typography
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @property {ElementType} as        - 태그 설정(기본값: span)
 * @property {boolean} isBold        - 텍스트 볼드 처리 유무(기본값: false)
 * @property {string} kind           - 타이포그래피 종류
 */
const Typography = ({ as = "span", isBold = false, kind, children }: TypographyProps) => {
  const As = as;
  const typography: { [key: string]: string } = {
    "headline-large": "text-[32px] leading-[44px]",
    "headline-medium": "text-[28px] leading-10",
    "headline-small": "text-2xl leading-[34px]",
    "title-large": "text-xl leading-[30px]",
    "title-medium": "text-lg leading-[26px]",
    "title-small": "text-base",
    "body-large": "text-[15px] leading-[22px]",
    "body-medium": "text-sm",
    "body-small": "text-[13px] leading-[19px]",
    "caption-large": "text-[12px] leading-[18px]",
    "caption-medium": "text-[11px] leading-[17px]",
    "caption-small": "text-[10px] leading-4",
  };

  return <As className={`${typography[kind]} ${isBold ? "font-semibold" : "font-normal"}`}>{children}</As>;
};


export default Typography;
