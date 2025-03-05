import React from "react";
import Image from "next/image";
import { RightArrow } from "@icons";

export default function RightArrowIcon() {
  return (
    <div className="flex justify-end items-end h-full">
      <Image src={RightArrow} alt="right arrow icon" />
    </div>
  );
}
