"use client";

import React from "react";
import { Typography } from "@components";
import CurrencyFormat from "react-currency-format";

type TInfo = "dbtrNm" | "lndThngAddr" | "slPrc";
const InfoData: Array<TInfo> = ["dbtrNm", "lndThngAddr", "slPrc"];
const InfoTitle: Record<TInfo, string> = {
  dbtrNm: "차주",
  lndThngAddr: "주소",
  slPrc: "매매금액",
};

function EstimateInfo({ estmInfoData }: { estmInfoData?: TEstimateList }) {
  return (
    <ul className="w-full p-4 bg-kos-gray-100 border-b-8 border-b-kos-gray-200">
      {!!estmInfoData &&
        estmInfoData?.searchDbtrInfo &&
        InfoData.map((key, index) => (
          <li
            key={key}
            className={`flex align-center justify-between ${
              index === 0 ? "mt-0" : "mt-2"
            }`}
          >
            <div className="min-w-[60px]">
              <Typography
                color={"text-kos-gray-600"}
                type={Typography.TypographyType.B2}
              >
                {InfoTitle[key]}
              </Typography>
            </div>
            <div className="text-right">
              {key === "slPrc" ? (
                <p>
                  <CurrencyFormat
                    decimalSeparator={"false"}
                    value={estmInfoData.searchDbtrInfo.slPrc ?? 0}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  원
                </p>
              ) : (
                <Typography
                  color={"text-kos-gray-800"}
                  type={Typography.TypographyType.B1}
                >
                  {estmInfoData.searchDbtrInfo[key]}
                </Typography>
              )}
            </div>
          </li>
        ))}
    </ul>
  );
}

export default EstimateInfo;
