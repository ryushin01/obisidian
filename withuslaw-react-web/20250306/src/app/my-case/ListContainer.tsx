import React, { forwardRef, ForwardedRef } from "react";
import { BadgeColorType } from "@components/Constants";
import { TypographyType } from "@components/typography/Constant";
import { Badge, Typography } from "@components";
import { getDay, checkIsToday } from "@utils/dateUtil";

type TProps = {
  className?: string;
  children: React.ReactNode;
  date?: string;
  id?: string;
};

function ListContainer(
  { className, children, date, id }: TProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const isToday = checkIsToday(date ?? "");

  return (
    <div className="flex flex-col" ref={ref} id={id}>
      <div className="flex gap-2 items-center">
        {isToday ? (
          <Badge colorType={BadgeColorType["orange-white"]}>당일</Badge>
        ) : (
          "•"
        )}
        <Typography
          type={TypographyType.H6}
          color="text-kos-gray-800"
          className={`${className}`}
        >
          {date &&
            `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(
              6,
              8
            )} (${getDay(date)})`}
        </Typography>
      </div>

      <ul className={`${className} rounded-2xl flex flex-col`}>{children}</ul>
    </div>
  );
}

export default forwardRef<HTMLDivElement, TProps>(ListContainer);
