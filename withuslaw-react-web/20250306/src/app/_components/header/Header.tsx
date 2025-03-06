import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Typography } from "@components";
import BackButton from "@components/header/BackButton";

export type THeader = {
  isBackButton?: boolean;
  backPath?: string;
  title?: string;
  rightItem?: ReactNode;
  bgColor?: string;
  backCallBack?: () => void;
};

export default function Header({
  isBackButton = true,
  backPath,
  title,
  bgColor = "bg-kos-white",
  rightItem,
  backCallBack,
}: THeader) {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 w-full z-30 box-border">
      <div
        className={`h-[60px] border-b border-b-1 w-full flex items-center ${
          bgColor ?? "bg-kos-white"
        }
        ${pathname === "/my-case" ? "border-transparent" : "border-gray-200"}
        `}
      >
        <div className="basis-1/4 flex h-full">
          {isBackButton && (
            <BackButton backPath={backPath} backCallBack={backCallBack} />
          )}
        </div>
        <div className="basis-2/4 flex justify-center">
          {title && (
            <Typography
              color={"text-kos-gray-800"}
              type={Typography.TypographyType.H3}
            >
              {title}
            </Typography>
          )}
        </div>
        <div className="basis-1/4 flex justify-end pr-4">{rightItem}</div>
      </div>
    </header>
  );
}
