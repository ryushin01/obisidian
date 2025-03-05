import React from "react";
import Image from "next/image";
import { OrangeArrowGroup } from "@icons";
import { Typography } from "@components";

export default function PayProceeding({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-x-2">
      <Image src={OrangeArrowGroup} alt="progress icons" />
      <Typography type={Typography.TypographyType.B1} color="text-kos-gray-600">
        {text}
      </Typography>
    </div>
  );
}
