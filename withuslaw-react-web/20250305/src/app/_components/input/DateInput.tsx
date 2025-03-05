import React, { forwardRef } from "react";
import Image from "next/image";
import CalendarGray from "public/icon/CalendarGray.svg";
import CalendarOrange from "public/icon/CalendarOrange.svg";

type TCustomInputProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  value?: string;
  dateType: "startDate" | "endDate";
};

const formatDate = (date?: string | null) => {
  if (date === undefined || date === null || date === "") return "날짜 선택";
  const dateArr = date.split("/");
  const yy = dateArr[2]?.slice(2, 4);
  const mm = dateArr[0];
  const dd = dateArr[1];
  return `${yy}.${mm}.${dd}`;
};

export const DateInput = forwardRef<HTMLButtonElement, TCustomInputProps>(
  ({ value, onClick, dateType }, ref) => {
    const index = dateType === "startDate" ? 0 : 1;
    value = value ?? "";
    return (
      <button
        type="button"
        className={`_flex-center rounded-xl w-full py-2 
      ${
        formatDate(value.split(" - ")[index]).includes(".")
          ? " bg-kos-orange-50"
          : " bg-kos-gray-100"
      }`}
        onClick={onClick}
        ref={ref}
      >
        <Image
          src={
            formatDate(value.split(" - ")[index]).includes(".")
              ? CalendarOrange
              : CalendarGray
          }
          alt="gray calendar"
        />
        <input
          readOnly
          className={`w-16 outline-none text-sm font-semibold ${
            formatDate(value.split(" - ")[index]).includes(".")
              ? "text-kos-orange-500 bg-kos-orange-50"
              : "text-kos-gray-600 bg-kos-gray-100"
          }`}
          type="text"
          name={dateType}
          id={dateType}
          value={formatDate(value.split(" - ")[index])}
        />
      </button>
    );
  }
);

DateInput.displayName = "DateInput";
