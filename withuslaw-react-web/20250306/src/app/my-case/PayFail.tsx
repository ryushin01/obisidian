import React from "react";
import Image from "next/image";
import { Caution } from "@icons";
import { Typography } from "@components";

export default function PayFail({
  text = "지급실패",
  errCd = "",
}: {
  text?: string;
  errCd?: string;
}) {
  return (
    <div className="flex gap-x-2 items-center">
      <Image src={Caution} alt="실패 아이콘" />
      <Typography type={Typography.TypographyType.H6} color="text-kos-red-500">
        {text}
        {errCd && <>[{errCd}]</>}
      </Typography>
    </div>
  );
}
