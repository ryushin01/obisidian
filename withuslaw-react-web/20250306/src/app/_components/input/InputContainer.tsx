import React, { ReactNode } from "react";

type TProps = {
  className?: string;
  children: ReactNode;
};

export default function InputContainer({ className, children }: TProps) {
  return (
    <fieldset className={`flex flex-col gap-y-1 ${className}`}>
      {children}
    </fieldset>
  );
}
