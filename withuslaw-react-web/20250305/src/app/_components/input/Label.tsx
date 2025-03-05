import React, { ReactNode } from "react";

export type TInputLabelProps = {
  htmlFor: string;
  children: ReactNode;
  rightItem?: ReactNode;
  required?: boolean;
};

export default function Label({
  htmlFor,
  children,
  rightItem,
  required,
}: TInputLabelProps) {
  return (
    <fieldset className="flex justify-between">
      <label
        htmlFor={htmlFor}
        className="text-xs text-kos-gray-600 font-semibold"
      >
        {children}
        {required && <span className="text-kos-red-500 text-xs ml-1">*</span>}
      </label>{" "}
      {rightItem}
    </fieldset>
  );
}
