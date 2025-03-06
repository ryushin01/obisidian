import React from "react";

type TProps = {
  address: string;
  className?: string;
};

export default function Address({ address, className }: TProps) {
  return (
    <span className={`pr-2 text-base font-semibold ${className} truncate`}>
      {address}
    </span>
  );
}
