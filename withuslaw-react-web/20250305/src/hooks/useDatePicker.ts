import { useState } from "react";

export default function useDatePicker() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDatePicker = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const reset = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return { startDate, endDate, handleDatePicker, reset };
}
