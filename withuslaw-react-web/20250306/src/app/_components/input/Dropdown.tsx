import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import Image from "next/image";
import { DownArrow } from "@icons";

type TProps = {
  isError?: boolean;
  onClick: () => void;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "className"
>;

export default function Dropdown({ onClick, isError, ...props }: TProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      // disabled={props.disabled}
      className={`w-full rounded-2xl border border-1 text-[15px] ${
        isError ? "border-kos-red-500" : "border-kos-gray-400 "
      } ${
        props.disabled ? "pointer-events-none bg-kos-gray-200 border-none" : ""
      } p-4 text-[15px] flex items-center gap-x-2.5`}
    >
      <input
        className={`w-full border-none outline-none truncate text-[15px] ${
          props.disabled
            ? "bg-transparent text-kos-gray-600 text-[15px]"
            : "text-kos-gray-800"
        } placeholder:text-kos-gray-500 `}
        readOnly
        {...props}
      />
      {!props.disabled && <Image src={DownArrow} alt="bottom arrow icon" />}
    </button>
  );
}
