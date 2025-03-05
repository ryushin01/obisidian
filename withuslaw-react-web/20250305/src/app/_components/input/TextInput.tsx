"use client";

import React, { DetailedHTMLProps, InputHTMLAttributes, useMemo } from "react";
import CurrencyFormat from "react-currency-format";

type TProps = {
  isCurrency?: boolean;
  isError?: boolean;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "className"
>;

export default function TextInput({ isCurrency, isError, ...props }: TProps) {
  const defaultClassName =
    "flex grow w-full rounded-2xl border border-1 focus:caret-kos-orange-300 focus:shadow-inputFocus p-4 text-[15px] leading-6";
  const className = useMemo(() => {
    if (props.disabled)
      return "border-kos-gray-200 bg-kos-gray-200 text-kos-gray-600";
    if (isError) return "border-kos-red-500 placeholder:text-kos-gray-800";
    return "border-kos-gray-400 bg-kos-white text-kos-gray-800 placeholder:text-kos-gray-500 focus:border-kos-orange-500 focus:ring-1 focus:ring-kos-orange-500";
  }, [isError, props.disabled]);

  if (isCurrency)
    return (
      <CurrencyFormat
        decimalSeparator={"false"}
        className={`${defaultClassName} ${className}`}
        thousandSeparator={true}
        maxLength={props.maxLength ?? 39}
        disabled={props.disabled}
        autoFocus={props.autoFocus}
        placeholder={props.placeholder}
        value={
          props.value && props.value?.toString().length > 1
            ? props.value.toString().replace(/^0+/, "")
            : (props.value as number | string)
        }
        onClick={props.onClick}
        onChange={props.onChange}
        readOnly={props.readOnly}
        type={"text"}
        inputMode="numeric"
      />
    );

  return <input className={`${defaultClassName} ${className}`} {...props} />;
}
// export default forwardRef<HTMLInputElement|CurrencyFormat, TProps>(TextInput)
