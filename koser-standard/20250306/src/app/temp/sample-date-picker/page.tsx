"use client";

import { DatePicker } from "@components/common";
import { useDatePicker } from "@hooks";

export default function SampleDatePicker() {
  const { reset, ...datePickerProps } = useDatePicker();

  return (
    <>
      {/* 단일 컴포넌트 */}
      <DatePicker {...datePickerProps} />

      {/* 복합 컴포넌트 */}
      <DatePicker {...datePickerProps} isMultiComponent={true} />

      {/* TODO: 버튼 그룹 컴포넌트 연동 */}
      <button type="button" onClick={reset}>초기화</button>
    </>
  );
}
