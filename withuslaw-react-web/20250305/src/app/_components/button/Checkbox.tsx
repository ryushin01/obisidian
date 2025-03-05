"use client";

import React, { ChangeEvent } from "react";
import Image from "next/image";
import {
  CheckBoxBigDisabled,
  CheckBoxBigOff,
  CheckBoxBigOn,
  CheckBoxSmallOff,
  CheckBoxSmallOn,
} from "@icons";
import { Size } from "@components/Constants";
import { Typography } from "@components";
import { TypographyType } from "@components/typography/Constant";

type TProps = {
  size: Size["Big" | "Small"];
  id: string;
  disabled?: boolean;
  label?: string;
  checked?: boolean;
  fontSize?: TypographyType;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  size,
  disabled = false,
  id,
  label,
  checked,
  fontSize,
  onChange,
}: TProps) {
  return (
    <div className="relative flex gap-x-2 items-center">
      <input
        autoFocus
        type="checkbox"
        name={id}
        id={id}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        className="peer appearance-none relative shrink-0 w-6 h-6 mb-1.5 focus:outline-none"
      />
      {disabled ? (
        <Image
          className="absolute top-0 w-6 h-6 pointer-events-none peer-checked:hidden mt-1"
          src={CheckBoxBigDisabled}
          alt="미선택 표시 아이콘"
        />
      ) : (
        <>
          <Image
            className="absolute top-0 w-6 h-6 pointer-events-none peer-checked:hidden mt-1"
            src={size === "Big" ? CheckBoxBigOff : CheckBoxSmallOff}
            alt="미선택 표시 아이콘"
          />
          <Image
            className="absolute top-0 hidden w-6 h-6 pointer-events-none peer-checked:block mt-1"
            src={size === "Big" ? CheckBoxBigOn : CheckBoxSmallOn}
            alt="선택 표시 아이콘"
          />
        </>
      )}
      {label && fontSize && (
        <label htmlFor={id}>
          <Typography
            color="text-kos-gray-700"
            type={Typography.TypographyType[fontSize]}
          >
            {label}
          </Typography>
        </label>
      )}
    </div>
  );
}
