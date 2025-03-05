"use client";

import React, {
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";
import CurrencyFormat from "react-currency-format";

type TProps = {
  styleType?: "default" | "error";
  inputType?: "text" | "money" | "date" | "time" | "number";
  thousandSeparator?: boolean;
  decimalSeparator?: boolean;
  leadingZero?: boolean;
  id?: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "className"
>;

const InputField = forwardRef<HTMLInputElement, TProps>(
  (
    {
      styleType = "default",
      inputType = "money",
      required = false,
      thousandSeparator = true,
      decimalSeparator = false,
      leadingZero = false,
      id,
      ...props
    },
    ref
  ) => {
    const className = `flex grow w-full rounded-2xl border border-1 text-[15px] ${
      styleType === "error"
        ? "border-kos-red-500 placeholder:text-kos-gray-800"
        : "placeholder:text-kos-gray-500"
    } ${
      props.disabled
        ? "border-kos-gray-200 bg-kos-gray-200 text-kos-gray-600 text-[15px]"
        : "border-kos-gray-400 bg-kos-white text-kos-gray-800"
    } focus:caret-[#FFBE5C] focus:border-kos-orange-500 focus:ring-1 focus:ring-kos-orange-500 focus:shadow-inputFocus p-4 text-[15px]"`;

    return inputType === "text" ? (
      <input
        id={id}
        disabled={props.disabled}
        required={required}
        className={className}
        type="text"
        ref={ref}
        {...props}
      />
    ) : inputType === "date" || inputType === "time" || leadingZero ? (
      <input
        id={id}
        disabled={props.disabled}
        required={required}
        className={className}
        type="tel"
        ref={ref}
        {...props}
      />
    ) : (
      <CurrencyFormat
        decimalSeparator={decimalSeparator === true ? "true" : "false"}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        className={className}
        thousandSeparator={thousandSeparator === true ? true : ""}
        onBlur={props.onBlur} // notify when input is touched
        onChange={props.onChange} // send value to hook form
        placeholder={props.placeholder}
        value={
          props.value && props.value?.toString().length > 1
            ? props.value.toString().replace(/^0+/, "")
            : (props.value as number | string)
        }
        maxLength={props.maxLength}
        onClick={props.onClick}
        onFocus={props.onFocus}
        readOnly={props.readOnly}
        type={"tel"}
      />
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
