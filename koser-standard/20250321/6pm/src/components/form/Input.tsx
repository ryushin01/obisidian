"use client";

import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from "react";
import "@styles/input.css";

type InputProps = {
  id?: string;
  type?: "text" | "password" | "tel" | "number";
  shape?: "lg" | "xl";
  required?: boolean;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isError?: boolean;
  name: string;
  defaultValue: string;
  //   color: "neutral" | "primary" | "secondary";
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "className"
>;

/**
 * @name Input
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 * @property {string} id           - 인풋 id를 정의합니다.
 * @property {string} type         - 인풋 타입을 정의합니다. (기본 = "number")
 * @property {string} shape        - 인풋의 쉐입을 정의합니다.
 * @property {boolean} required    - 인풋의 필수 여부를 정의합니다.
 * @property {boolean} disabled    - 인풋의 비활성화 상태를 정의합니다.
 * @property {function} onChange   - 인풋 작성시 포커스시 동작을 위해 정의합니다.
 * @property {function} onFocus    - 인풋 포커스시 동작을 위해 정의합니다.
 * @property {function} onBlur     - 인풋 포커스 해제시 포커스시 동작을 위해 정의합니다.
 * @property {string} placeholder  - 인풋의 힌트 텍스트를 정의합니다.
 * @property {boolean} isError     - 인풋의 에러 상태를 정의합니다.
 * @property {string} name         - 인풋의 이름을 정의합니다.
 * @property {string} defaultValue - 인풋에 입력된 값을 정의합니다.
 */
export default function Input({
  id,
  type = "number",
  shape = "lg",
  required = false,
  disabled,
  onChange,
  onFocus,
  onBlur,
  placeholder = "입력해 주세요.",
  name,
  defaultValue,
  isError,
  ...props
}: InputProps) {
  const className = `_text-input ${
    shape === "lg" ? "rounded-lg" : "rounded-3xl"
  } ${isError ? "_error" : ""}`;
  return (
    <>
      <input
        type={type}
        id={id}
        required={required}
        disabled={disabled}
        readOnly={disabled}
        placeholder={placeholder}
        className={className}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        defaultValue={defaultValue}
        {...props}
      />
    </>
  );
}
