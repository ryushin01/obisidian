import { ReactNode } from "react";
import { Typography } from "@components/common";
import "@styles/button.css";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  shape: "solid" | "outline" | "none";
  size: "sm" | "md" | "lg";
  color: "main100" | "main70" | "main60" | "main5" | "grayscale";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  children?: string;
  disabled?: boolean;
  role?: string;
  isSelected?: boolean;
};

/**
 * @name Button
 * @version 1.1.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 *         류창선 <zero.ryushin@bankle.co.kr>
 * @property {string} type           - 버튼 타입을 정의합니다.
 * @property {string} shape          - 버튼 쉐입을 정의합니다.
 * @property {string} size           - 버튼 크기를 정의합니다.
 * @property {string} color          - 버튼 색상을 정의합니다.
 * @property {string} icon           - 버튼의 아이콘을 정의합니다.
 * @property {string} iconPosition   - 버튼의 아이콘 위치를 정의합니다.
 * @property {function} onClick      - 버튼 클릭시 동작을 위해 정의합니다.
 * @property {boolean} disabled      - 버튼의 비활성화 상태를 정의합니다.
 * @property {string} role           - 버튼 그룹에서 aria-selected 속성 사용을 위한 역할 속성
 * @property {boolean} isSelected    - 버튼 그룹에서 선택된 버튼 구분
 */

export default function Button({
                                 type = "button",
                                 shape,
                                 color,
                                 size,
                                 icon,
                                 iconPosition,
                                 onClick,
                                 children = "",
                                 disabled = false,
                                 role,
                                 isSelected,
                               }: ButtonProps) {
  let buttonSize = "";
  let solidButtonColor = "";
  let solidButtonActionColor = "";
  let outlineButtonActionColor = "";
  let outlineButtonColor = "";
  const isSolid = shape === "solid";
  const isNone = shape === "none";

  /* 버튼 size switch */
  switch (size) {
    case "sm":
      buttonSize = "py-2";
      break;
    case "md":
      buttonSize = "py-3";
      break;
    case "lg":
      buttonSize = "py-4";
      break;
    default:
      buttonSize = "py-2";
  }

  /* 솔리드 버튼 color switch */
  switch (color) {
    case "main100":
      solidButtonColor = "bg-koser-main-100 text-koser-grayscale-0";
      break;
    case "main70":
      solidButtonColor = "bg-koser-main-70 text-koser-grayscale-0";
      break;
    case "main60":
      solidButtonColor = "bg-koser-main-60 text-koser-grayscale-0";
      break;
    case "main5":
      solidButtonColor = "bg-koser-main-5 text-koser-main-100";
      break;
    case "grayscale":
      solidButtonColor = "bg-koser-grayscale-60 text-koser-grayscale-0";
      break;
    default:
      solidButtonColor = "bg-koser-main-100 text-koser-grayscale-0";
  }

  /* 솔리드 버튼 호버 color switch */
  switch (color) {
    case "main100":
      solidButtonActionColor =
        "hover:bg-koser-main-90 text-koser-grayscale-0 focus:bg-koser-main-70 text-koser-grayscale-0 active:bg-koser-main-70 text-koser-grayscale-0";
      break;
    case "main60":
      solidButtonActionColor =
        "hover:bg-koser-main-50 text-koser-grayscale-0 focus:bg-koser-main-40 text-koser-grayscale-0 active:bg-koser-main-40 text-koser-grayscale-0";
      break;
    case "main5":
      solidButtonActionColor =
        "hover:bg-koser-main-15 text-koser-main-100 focus:bg-koser-main-30 text-koser-main-100 active:bg-koser-main-30 text-koser-main-100";
      break;
    case "grayscale":
      solidButtonActionColor =
        "hover:bg-koser-grayscale-50 text-koser-grayscale-0 focus:bg-koser-grayscale-40 text-koser-grayscale-0 active:bg-koser-grayscale-40 text-koser-grayscale-0";
      break;
    default:
      solidButtonActionColor =
        "hover:bg-koser-main-90 text-koser-grayscale-0 focus:bg-koser-main-70 text-koser-grayscale-0 active:bg-koser-main-70 text-koser-grayscale-0";
  }

  /* 아웃라인버튼 color switch */
  switch (color) {
    case "main5":
      outlineButtonColor =
        "bg-koser-main-5 border border-koser-main-100 text-koser-main-100";
      break;
    case "grayscale":
      outlineButtonColor =
        "bg-koser-grayscale-0 border border-koser-grayscale-40 text-koser-grayscale-90";
      break;
    default:
      outlineButtonColor =
        "bg-koser-grayscale-0 border border-koser-grayscale-40 text-koser-grayscale-90";
  }

  /* 아웃라인 버튼 호버 color switch */
  switch (color) {
    case "main5":
      outlineButtonActionColor =
        "hover:bg-koser-main-15 border-koser-main-100 text-koser-main-100 focus:bg-koser-main-30 border-koser-main-100 text-koser-main-100 active:bg-koser-main-30 border-koser-main-100 text-koser-main-100";
      break;
    case "grayscale":
      outlineButtonActionColor =
        "hover:bg-koser-grayscale-10 border-grayscale-40 text-grayscale-90 focus:bg-koser-grayscale-20 border-koser-grayscale-40 text-grayscale-90 active:bg-grayscale-20 border-grayscale-40 text-koser-grayscale-90";
      break;
    default:
      outlineButtonActionColor =
        "hover:bg-koser-grayscale-10 border-grayscale-40 text-grayscale-90 focus:bg-koser-grayscale-20 border-koser-grayscale-40 text-grayscale-90 active:bg-grayscale-20 border-grayscale-40 text-koser-grayscale-90";
  }

  /* 보더 radius */
  const borderRadius =
    size === "md" || size === "lg" ? "rounded-lg" : "rounded-md";

  const className = `_text-button ${buttonSize} ${
    disabled
      ? "_disabled"
      : isNone
        ? "bg-koser-grayscale-0 border-none outline-none text-koser-grayscale-90 hover:bg-koser-grayscale-10 text-koser-grayscale-90 focus:bg-koser-grayscale-20 text-koser-grayscale-90 active:bg-koser-grayscale-20 text-koser-grayscale-90"
        : isSolid
          ? `${solidButtonColor}`
          : `${outlineButtonColor}`
  }  ${borderRadius} ${
    disabled ? "" : isSolid ? solidButtonActionColor : outlineButtonActionColor
  }`;

  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      role={role}
      aria-selected={isSelected}
      aria-label={`${children} 버튼`}
    >
      {icon && iconPosition === "left" && <span className="pr-1">{icon}</span>}
      <Typography
        kind={
          size === "sm"
            ? "body-medium"
            : size === "md"
              ? "title-small"
              : "title-medium"
        }
      >
        {children}
      </Typography>
      {icon && iconPosition === "right" && <span className="pl-1">{icon}</span>}
    </button>
  );
}
