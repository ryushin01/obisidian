import React, { ReactNode } from "react";
import { BadgeColorType } from "@components/Constants";

type TProps = {
  colorType: keyof typeof BadgeColorType;
  children: ReactNode;
};

const getClassName = (colorType: BadgeColorType) => {
  const defaultClassName =
    "text-xs px-1 py-0.5 rounded font-semibold whitespace-nowrap ";
  switch (colorType) {
    case BadgeColorType.brown:
      return defaultClassName + "bg-kos-brown-50 text-kos-brown-300";

    case BadgeColorType.blue:
      return defaultClassName + "bg-kos-blue-100 text-kos-blue-500";

    case BadgeColorType.green:
      return defaultClassName + "bg-kos-green-100 text-kos-green-500";

    case BadgeColorType.red:
      return defaultClassName + "bg-kos-red-100 text-kos-red-500";

    case BadgeColorType["orange-white"]:
      return defaultClassName + "bg-kos-orange-500 text-kos-white rounded";

    case BadgeColorType["brown-orange"]:
      return defaultClassName + "bg-kos-brown-300 text-kos-orange-500";

    case BadgeColorType["gray-white"]:
      return defaultClassName + "bg-[#E9E9E9] text-kos-gray-700";

    case BadgeColorType.gray:
      return defaultClassName + "bg-kos-brown-50 text-kos-brown-100";

    default:
      return defaultClassName;
  }
};
export default function Badge({ colorType, children }: TProps) {
  const className = getClassName(colorType);

  return <div className={className}>{children}</div>;
}
