import React from "react";
import Image from "next/image";
import { SucessCheck } from "@icons";
import { Typography } from "@components";

export default function PaySuccess({ text = "지급 완료" }: { text?: string }) {
  return (
    <div className="flex gap-x-2 items-center">
      <Image src={SucessCheck} alt="성공 아이콘" />{" "}
      <Typography
        type={Typography.TypographyType.H6}
        color="text-kos-green-500"
      >
        {text}
      </Typography>
    </div>
  );
}
