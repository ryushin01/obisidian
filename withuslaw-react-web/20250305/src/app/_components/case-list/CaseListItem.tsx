"use client";

import React, { Fragment } from "react";
import { RGSTR_GB_CD, RGSTR_TEXT } from "@constants";
import { BadgeColorType } from "@components/Constants";
import { Badge } from "@components";

type TProps = {
  rgstrGbCd: RGSTR_GB_CD; // 등기 구분 코드
  isNew?: boolean;
  contentsList: React.ReactNode[];
  leftItem?: React.ReactNode;
  className?: string;
  footerRightItem?: React.ReactNode;
  price?: boolean;
  statCd?: string;
};

export default function CaseListItem({
  rgstrGbCd,
  isNew = false,
  contentsList,
  leftItem,
  className,
  footerRightItem,
  price,
  statCd,
}: TProps) {
  return (
    <div className={`flex gap-4 items-start py-3 ${className}`}>
      <div className="w-9">{leftItem}</div>
      <div className={"w-full min-w-[200px] flex flex-col gap-1"}>
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <Badge
              colorType={
                rgstrGbCd === RGSTR_GB_CD["01"]
                  ? BadgeColorType.green
                  : rgstrGbCd === RGSTR_GB_CD["02"]
                  ? BadgeColorType.blue
                  : BadgeColorType.brown
              }
            >
              {RGSTR_TEXT[rgstrGbCd]}
            </Badge>
            {isNew && <Badge colorType={BadgeColorType.red}>NEW</Badge>}
          </div>
        </div>
        {contentsList.map((el, i) =>
          i !== contentsList.length - 1 ? (
            <Fragment key={i}>{el}</Fragment>
          ) : (
            <div key={i} className="flex justify-between items-center">
              <Fragment key={i}>{el}</Fragment>
              {price ? (
                <span className="shrink-0 text-kos-orange-500 text-right font-semibold">
                  {footerRightItem}
                </span>
              ) : (
                <span>{footerRightItem}</span>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
