"use client";

import React from "react";
import RadioButton, { TRadioProps } from "@components/button/radio/RadioButton";

type RadioGroupProps = {
  label?: string;
  radioOptions: TRadioProps[];
};

const RadioGroup = ({ radioOptions, label }: RadioGroupProps) => {
  return (
    <fieldset>
      <legend>{label}</legend>
      {radioOptions.map((option) => (
        <RadioButton key={option.id} {...option} />
      ))}
    </fieldset>
  );
};

RadioGroup.Radio = RadioButton;

export { RadioGroup };
