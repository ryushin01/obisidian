import { ReactNode } from "react";
import Image from "next/image";
import { WhiteArrowGroup } from "@icons";
import { Typography } from "@components";

export default function ActivateHeader({ children }: { children: ReactNode }) {
  return (
    <div className="absolute px-5 h-10 top-0 left-0 gap-2 bg-orange-300 w-full flex items-center rounded-lg">
      <Image src={WhiteArrowGroup} alt="사건 진행 화살표 아이콘" />
      <Typography type={Typography.TypographyType.H5} color="text-kos-gray-800">
        {children}
      </Typography>
    </div>
  );
}
