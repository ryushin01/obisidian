"use client";

import React from "react";
import Image from "next/image";
import { RadioDisableOff, RadioDisableOn, RadioOff, RadioOn } from "@icons";
import { Typography } from "@components";

export type TRadioProps = {
  id: string;
  name: string;
  label?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
};

export default function RadioButton({
  id,
  name,
  label,
  defaultChecked,
  disabled,
}: TRadioProps) {
  return (
    <div className="relative flex gap-x-2 items-center">
      <input
        id={id}
        className={`peer appearance-none`}
        type="radio"
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <Image
        src={disabled ? RadioDisableOn : RadioOn}
        className="hidden peer-checked:block"
        alt="checked radio"
      />
      <Image
        src={disabled ? RadioDisableOff : RadioOff}
        className="peer-checked:hidden"
        alt="checked radio"
      />
      <label htmlFor={id}>
        <Typography
          type={Typography.TypographyType.H3}
          color="text-kos-gray-500"
        >
          {label}
        </Typography>
      </label>
    </div>
  );
}
