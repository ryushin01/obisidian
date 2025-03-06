"use client";

import React, { useMemo, useState } from "react";

type TProps = {
  disabled?: boolean;
  defaultIsOn?: boolean;
  getState: (state: boolean) => void;
};

export default function Switch({
  disabled,
  defaultIsOn = false,
  getState,
}: TProps) {
  const [isOn, setIsOn] = useState(defaultIsOn);

  const bgColor = useMemo(() => {
    if (disabled) {
      return defaultIsOn ? "bg-kos-orange-100" : "bg-kos-gray-200";
    }
    return isOn ? "bg-kos-orange-300" : "bg-kos-gray-400";
  }, [disabled, defaultIsOn, isOn]);

  const toggleReview = () => {
    if (disabled) return;
    setIsOn((prevState) => !prevState);
    getState(!isOn);
  };

  return (
    <div
      className={`relative w-10 h-6 rounded-3xl ${bgColor}`}
      onClick={toggleReview}
    >
      <span
        className={`absolute top-1/2 transform -translate-y-1/2 left-0.5 w-5 h-5 bg-kos-white rounded-full transition-transform duration-300 ${
          isOn ? "translate-x-[15px]" : "translate-x-[2px]"
        }`}
      />
    </div>
  );
}
