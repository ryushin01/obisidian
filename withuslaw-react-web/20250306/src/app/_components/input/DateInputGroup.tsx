"use client";

import React from "react";
import { DateInput } from "@components/input/DateInput";
import { stringToDate } from "@utils/dateUtil";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type TDateInput = {
  startDate: Date | null;
  endDate: Date | null;
  handleDatePicker: (dates: [Date | null, Date | null]) => void;
  condition: Pick<TFillInfo, "startDate" | "endDate">;
};

export default function DateInputGroup({
  startDate,
  endDate,
  handleDatePicker,
  condition,
}: TDateInput) {
  const minDate = startDate || stringToDate(condition.startDate);
  const maxDate = endDate || stringToDate(condition.endDate);

  return (
    <div className="flex items-end w-full">
      <div className="flex flex-col gap-y-1 grow font-semibold h-[64px]">
        <label htmlFor="startDate" className="text-kos-gray-600 text-xs">
          시작 날짜
        </label>
        <ReactDatePicker
          minDate={minDate}
          maxDate={maxDate}
          className=""
          selected={startDate}
          onChange={handleDatePicker}
          startDate={startDate}
          endDate={endDate}
          customInput={React.createElement(DateInput, {
            dateType: "startDate",
          })}
          selectsRange
        />
      </div>{" "}
      <span className="flex items-baseline justify-center w-4 h-[35px] text-kos-gray-500">
        -
      </span>
      <div className="flex flex-col gap-y-1 grow font-semibold h-[64px]">
        <label htmlFor="endDate" className="text-kos-gray-600 text-xs">
          종료 날짜
        </label>
        <ReactDatePicker
          minDate={minDate}
          maxDate={maxDate}
          className=""
          selected={endDate}
          onChange={handleDatePicker}
          startDate={startDate}
          endDate={endDate}
          customInput={React.createElement(DateInput, {
            dateType: "endDate",
          })}
          selectsRange
        />
      </div>
    </div>
  );
}
