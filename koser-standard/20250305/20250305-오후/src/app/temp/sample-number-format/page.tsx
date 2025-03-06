"use client";

import { NumberFormat } from "@components/common";

export default function SampleNumberFormat() {

  return (
    <>
      {/* 통화 모드 */}
      <NumberFormat value={5000000} displayType="input" />

      {/* 날짜 모드 */}
      <NumberFormat mode="date" value={20250217} />
    </>
  );
}
