import React from "react";
import { Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";

type TProps = {
  clientForm: TEstimateSaveForm;
};

export default function EstimateSignList({ clientForm }: TProps) {
  return (
    <div className="py-6 px-4">
      <Typography color="text-kos-gray-800" type={TypographyType.H2}>
        견적 안내문
      </Typography>
      <Typography
        className="mt-3 leading-[26px] break-all"
        color="text-kos-gray-700"
        type={TypographyType.B1}
      >
        {clientForm?.memo}
      </Typography>
    </div>
  );
}
