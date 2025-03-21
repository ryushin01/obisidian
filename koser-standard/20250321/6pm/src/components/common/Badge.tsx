import React, { ReactNode } from "react";
import Typography from "./Typography";
import "@styles/badge.css";

type BadgeProps = {
  type: "number" | "text";
  colorType: "active" | "default";
  children: ReactNode;
};

/**
 * @name Badge
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 * @property {string} type         - 뱃지에 표시될 내용에 따라 타입 분류
 * @property {string} colorType    - 뱃지 컬러
 */

/* TODO: colorType constants화 필요한지 고민해보기, children이 1000이상이면 +999로 표시되게 하기! */

const getClassName = (colorType: string, type: string) => {
  if (type === "number") {
    switch (colorType) {
      case "active":
        return "_badge bg-koser-main-100 text-koser-grayscale-0 rounded-full min-w-7";

      case "default":
        return "_badge bg-koser-grayscale-40 text-koser-grayscale-80 rounded-full min-w-7";

      default:
        return "_badge bg-koser-grayscale-40 text-koser-grayscale-80 rounded-full min-w-7";
    }
  } else if (type === "text") {
    switch (colorType) {
      case "active":
        return "_badge bg-koser-main-100 text-koser-grayscale-0 rounded-md min-w-8";

      case "default":
        return "_badge bg-koser-main-10 text-koser-koser-main-100 rounded-md min-w-8";

      default:
        return "_badge bg-koser-main-10 text-koser-koser-main-100 rounded-md min-w-8";
    }
  }
};
export default function Badge({ type, colorType, children }: BadgeProps) {
  const className = getClassName(colorType, type);

  return (
    <div className={className}>
      <Typography kind="caption-large">{children}</Typography>
    </div>
  );
}
