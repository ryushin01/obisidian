import { ReactNode } from "react";
import "@styles/button.css";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  shape: "solid" | "outline" | "none";
  size: "xsmall" | "small" | "medium" | "large";
  color: "neutral" | "primary" | "grayscale";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  children?: string;
  disabled?: boolean;
};

/**
 * @name Button
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 * @property {string} type           - 버튼 타입을 정의합니다.
 * @property {string} shape          - 버튼 쉐입을 정의합니다.
 * @property {string} size           - 버튼 크기를 정의합니다.
 * @property {string} color          - 버튼 색상을 정의합니다.
 * @property {string} icon           - 버튼의 아이콘을 정의합니다.
 * @property {string} iconPosition   - 버튼의 아이콘 위치를 정의합니다.
 * @property {function} onClick      - 버튼 클릭시 동작을 위해 정의합니다.
 * @property {boolean} disabled      - 버튼의 비활성화 상태를 정의합니다.
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
}: ButtonProps) {
  let buttonSize = "";
  let solidButtonColor = "";
  let outlineButtonColor = "";
  const isSolid = shape === "solid";
  const isNone = shape === "none";

  /* 버튼 size switch */
  /* TODO : 만약 py가 공통이면 글로벌css에 py-2추가 */
  switch (size) {
    case "medium":
      buttonSize = "px-12 py-2";
      break;
    case "large":
      buttonSize = "px-16 py-2";
      break;
    case "small":
      buttonSize = "px-6 py-2";
      break;
    case "xsmall":
      buttonSize = "px-2 py-2";
      break;
    default:
      buttonSize = "px-2 py-2";
  }

  /* 솔리드 버튼 color switch */
  switch (color) {
    case "primary":
      solidButtonColor =
        "bg-koser-primary-100 border-none text-koser-grayscale-0";
      break;
    case "grayscale":
      solidButtonColor =
        "bg-koser-grayscale-50 border-none text-koser-grayscale-0";
      break;
    case "neutral":
      solidButtonColor =
        "bg-koser-primary-60 border-none text-koser-grayscale-0";
      break;
    default:
      solidButtonColor =
        "bg-koser-primary-100 border-none text-koser-grayscale-0";
  }

  /* 아웃라인버튼 color switch */
  switch (color) {
    case "primary":
    case "neutral":
      outlineButtonColor =
        "bg-koser-primary-20 border border-koser-primary-90 text-koser-primary-90";
      break;
    case "grayscale":
      outlineButtonColor =
        "bg-transparent border border-koser-grayscale-40 text-koser-grayscale-90";
      break;
    default:
      outlineButtonColor =
        "bg-koser-primary-20 border border-koser-primary-90 text-koser-primary-90";
  }

  /* 보더 radius */
  const borderRadius =
    size === "medium" || size === "large" ? "rounded-lg" : "rounded-md";

  const className = `_text-button ${
    disabled
      ? "_disabled"
      : isNone
      ? "bg-transparent border-none outline-none"
      : isSolid
      ? `${solidButtonColor}`
      : `${outlineButtonColor}`
  } ${buttonSize} ${borderRadius} ${
    /* TODO : hover color별로 분기처리 */
    disabled
      ? ""
      : isSolid
      ? "hover:bg-koser-primary-90 focus:bg-koser-primary-90 active:bg-koser-primary-70"
      : "hover:bg-koser-primary-30 focus:bg-koser-primary-30 active:bg-koser-primary-50"
  }`;

  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={`${children} 버튼`}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
}
