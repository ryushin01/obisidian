import { useState } from "react";

/**
 * @name useDatePicker
 * @version 1.0.0
 * @author 불명 <unknown@bankle.co.kr>
 * @description 차세대 KOS App 프로젝트에서 추출한 커스텀 훅
 */
export default function useDatePicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDatesPicker = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleDatePicker = (date: Date | null) => {
    setStartDate(date);
  };

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return { startDate, endDate, handleDatePicker, handleDatesPicker, reset };
}
