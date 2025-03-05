import React from "react";

type TProps = {
  className?: string;
};

export default function Divider({ className }: TProps) {
  return <div className={`w-full h-2 bg-kos-gray-200 ${className}`} />;
}
