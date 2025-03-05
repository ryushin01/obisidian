import React, { ReactNode } from "react";

type ButtonType = {
  children: ReactNode;
  background?: "kos-orange-500" | "kos-gray-200" | "white";
  color?: "kos-gray-600" | "kos-gray-700" | "white";
  border?: "kos-gray-400" | "kos-gray-500";
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  onChange?: () => void;
};

export default function Button({
  children,
  background,
  color,
  border,
  className,
  disabled,
  onClick,
  onChange,
}: ButtonType) {
  return (
    <button
      type="button"
      className={`${className} w-full ${
        disabled
          ? "bg-kos-gray-200 text-kos-gray-600"
          : `bg-${background} text-${color}`
      } rounded-[12px] ${border ? `border border-solid border-${border}` : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
