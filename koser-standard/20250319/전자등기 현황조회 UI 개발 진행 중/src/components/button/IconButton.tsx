import { ReactNode } from "react";
import "@styles/button.css";

type IconButtonProps = {
  type?: "button" | "submit" | "reset";
  size: "md" | "lg";
  icon: ReactNode;
  onClick?: () => void;
  children?: string;
  disabled?: boolean;
};

export default function IconButton({
  type = "button",
  size,
  icon,
  onClick,
  children = "",
  disabled = false,
}: IconButtonProps) {
  let buttonSize = "";
  // let colorSet = ``;

  switch (size) {
    case "md":
      buttonSize = "w-8 h-8";
      break;
    case "lg":
      buttonSize = "w-9 h-9";
      break;
    default:
      buttonSize = "w-8 h-8";
  }

  const className = `_icon-button ${
    disabled ? "_disabled" : ""
  } ${buttonSize} ${"focus:opacity-30 active:bg-koser-primary-50"}`;

  return (
    <button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={`${children} 버튼`}
    >
      {icon && <span>{icon}</span>}
    </button>
  );
}
