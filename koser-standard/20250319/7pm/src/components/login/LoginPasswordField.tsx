import { ChangeEvent } from "react";
import { Label, Input, InputMessage, ErrorMessage } from "@components/form";

type passwordFieldProps = {
  htmlFor?: string;
  labelText?: string;
  isError?: boolean;
  type?: "text" | "password" | "tel";
  shape?: "lg" | "xl";
  disabled?: boolean;
  required?: boolean;
  onClick?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
  defaultValue: string;
  inputMessage?: string;
  errorMessage?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  inputSize?: "sm" | "md" | "lg";
};

/**
 * @name LoginPasswordField
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 * @property {string} htmlFor      - 인풋 id와 매치 시키는 라벨 속성을 정의합니다.
 * @property {string} labelText    - 라벨의 텍스트 내용을 정의합니다.
 * @property {boolean} isError     - 라벨과 인풋의 에러 상태를 정의합니다.
 * @property {string} type         - 인풋 타입을 정의합니다.
 * @property {string} shape        - 인풋의 쉐입을 정의합니다.
 * @property {boolean} required    - 라벨과 인풋의 필수 표시 여부를 정의합니다.
 * @property {boolean} disabled    - 인풋의 비활성화 상태를 정의합니다.
 * @property {function} onChange   - 인풋 작성시 실행할 함수를 위해 미리 정의합니다.
 * @property {function} onClick    - 인풋 클릭시 실행할 함수를 위해 미리 정의합니다.
 * @property {string} placeholder  - 인풋의 힌트 텍스트를 정의합니다.
 * @property {string} name         - 인풋의 이름을 정의합니다.
 * @property {string} inputMessage - 포커스시 인풋 하단 텍스트 내용을 정의합니다.
 * @property {string} errorMessage - 에러시 인풋 하단 텍스트 내용을 정의합니다.
 * @property {string} inputSize    - 인풋 크기를 정의합니다.
 */
export default function LoginPasswordField({
                                             htmlFor,
                                             labelText,
                                             isError,
                                             type,
                                             shape,
                                             inputSize = "sm",
                                             required,
                                             disabled,
                                             onChange,
                                             // onClick,
                                             onFocus,
                                             onBlur,
                                             placeholder,
                                             name,
                                             defaultValue,
                                             inputMessage = "",
                                             errorMessage = "",
                                             icon,
                                             iconPosition,
                                           }: passwordFieldProps) {
  const hasIcon = icon ? true : false; // icon 있으면 true 없으면 false

  let setSize = "";
  switch (inputSize) {
    case "sm":
      setSize = "py-2 text-[14px]";
      break;
    case "md":
      setSize = "py-3 text-[16px]";
      break;
    case "lg":
      setSize = "py-4 text-[18px]";
      break;
    default:
      setSize = "py-2 text-[14px]";
  }

  const inputWithLabelText = `_no-password-input _label-text-input ${setSize} ${
    isError ? "_error" : ""
  }`;

  return (
    <Label
      htmlFor={htmlFor}
      required={required}
      labelText={labelText}
      hasIcon={hasIcon}
      isError={isError}
    >
      <div className={inputWithLabelText}>
        {icon && iconPosition === "left" && (
          <span className="pr-1 w-[24px]">{icon}</span>
        )}
        <Input
          id={htmlFor}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={disabled}
          required={required}
          name={name}
          shape={shape}
          isError={isError}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          defaultValue={defaultValue}
        />
        {icon && iconPosition === "right" && (
          <span className="pl-1 w-[24px]">{icon}</span>
        )}
      </div>
      {isError ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : inputMessage ? (
        <InputMessage>{inputMessage}</InputMessage>
      ) : (
        ""
      )}
    </Label>
  );
}
