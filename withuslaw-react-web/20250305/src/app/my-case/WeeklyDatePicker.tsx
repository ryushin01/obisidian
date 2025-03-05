"use client";

import React, { useEffect, useRef, useState } from "react";
import scrollIntoView from "scroll-into-view-if-needed";

const ScrollInlineType = {
  START: "start",
  END: "end",
} as const;
type ScrollInlineType =
  (typeof ScrollInlineType)[keyof typeof ScrollInlineType];

export type TScrollInfo = {
  type: ScrollInlineType;
  prev: number;
  cur: number;
  next: number;
};
type TPrpos = {
  onClickDate: (date: number) => void;
  dateList: number[];
  scrollInfo: TScrollInfo;
};

const rows = [
  { day: "일", date: 7 },
  { day: "월", date: 8 },
  { day: "화", date: 9 },
  { day: "수", date: 10 },
  { day: "목", date: 11 },
  { day: "금", date: 12 },
  { day: "토", date: 13 },
  { day: "일", date: 14 },
  { day: "월", date: 15 },
  { day: "화", date: 16 },
  { day: "수", date: 17 },
  { day: "목", date: 18 },
  { day: "금", date: 19 },
  { day: "토", date: 20 },
  { day: "일", date: 21 },
  { day: "월", date: 22 },
  { day: "화", date: 23 },
  { day: "수", date: 24 },
  { day: "목", date: 25 },
  { day: "금", date: 26 },
  { day: "토", date: 27 },
];

export default function WeeklyDatePicker({
  onClickDate,
  dateList,
  scrollInfo,
}: TPrpos) {
  const today = new Date().getDate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dateRefs = useRef<HTMLDivElement[] | null>([]);
  const [activeDate, setActiveDate] = useState(0);
  const [dayElwidth, setDayElWidth] = useState(0);

  const autoScrollDate = (date: number, type: ScrollInlineType) => {
    if (!!dateRefs.current) {
      scrollIntoView(dateRefs.current[date], {
        scrollMode: "if-needed",
        behavior: "smooth",
        inline: type,
      });
    }
  };

  useEffect(() => {
    if (!!scrollInfo.cur) autoScrollDate(scrollInfo.cur, scrollInfo.type);
  }, [scrollInfo.cur, scrollInfo.type]);

  useEffect(() => {
    if (!!scrollContainerRef.current) {
      setDayElWidth(scrollContainerRef.current?.clientWidth / 7);
    }
  }, [scrollContainerRef, dateRefs]);

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full overflow-x-scroll h-16 border-box"
    >
      <div className="absolute flex h-full">
        {rows.map((row) => (
          <div
            key={row.date}
            ref={(el) => {
              if (typeof dateRefs !== "function" && el && dateRefs.current)
                dateRefs.current[row.date] = el;
            }}
            className={`h-full rounded-xl flex flex-col justify-evenly ${
              row.date === today
                ? "bg-kos-gray-200"
                : row.date === activeDate
                ? "bg-kos-orange-100"
                : "bg-kos-white"
            }`}
            style={{ width: dayElwidth }}
            onClick={() => {
              if (!dateList.includes(row.date)) return;
              onClickDate(row.date);
              setActiveDate(row.date);
            }}
          >
            <p className="text-center text-disable text-sm">{row.day}</p>
            <div
              className={`text-center relative text-[15px] w-full font-bold ${
                dateList.includes(row.date)
                  ? "text-kos-gray-700"
                  : "text-disable line-through"
              }`}
              style={{ color: row.day === "일" ? "#E14B4B" : "" }}
            >
              {row.date}
              {dateList.includes(row.date) && (
                <span className="absolute w-1.5 h-1.5 bg-default right-2" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
