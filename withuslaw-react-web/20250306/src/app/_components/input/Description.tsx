import React, { ReactNode } from "react";

export type TInputDescriptionProps = {
  isError?: boolean;
  children: ReactNode;
};

export default function Description({
  isError,
  children,
}: TInputDescriptionProps) {
  return (
    <p
      className={`text-end text-[13px] ${
        isError ? "text-kos-red-500" : "text-kos-gray-500"
      }`}
    >
      {children}
    </p>
  );
}
