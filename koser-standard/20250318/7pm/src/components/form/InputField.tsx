import { ChangeEvent, useState } from "react";
import Label from "./Label";
import Input from "./Input";
import InputMessage from "./InputMessage";
import Image from "next/image";
// import { openEyeIcon, closedEyeIcon } from "@icons";
import { EyeIcon, EyeOffIcon } from "@icons20";
import ErrorMessage from "./ErrorMessage";

type InputFieldProps = {
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
  hasButton?: boolean;
  inputSize?: "sm" | "md" | "lg";
};

/**
 * @name InputField
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
export default function InputField({
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
                                     hasButton = false,
                                   }: InputFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const [isHideText, setIsHideText] = useState(true);
  const hasIcon = icon ? true : false; // icon 있으면 true 없으면 false

  // const handleClick () => {
  //   setValue("");
  //   // onClick();
  // }

  /* TODO : password가 아닌 다른걸로 분기처리 방법 찾아보기. input+button 조합 password 아닌것도 있을수있음. 
  button/icon >> button type(button/reset) | src(토글이면 이미지 두개) | alt */

  /* inputField 분기처리
  1. type password - 텍스트 + 아이콘 (토글아이콘 및 아이콘으로 type password -> text로 변경)
  2. hasbutton - 텍스트 + 버튼 (reset)
  3. hasicon - 텍스트 + 아이콘(버튼아님) || 텍스트
  */

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

  // labelText & htmlFor 유무 | type=password css 컨트롤
  const inputWithLabelText =
    type === "password"
      ? `_password-input ${setSize} ${isError ? "_error" : ""}`
      : `_no-password-input _labeltext-input ${setSize} ${
        isError ? "_error" : ""
      }`;

  return type === "password" ? (
    <>
      <Label
        htmlFor={htmlFor}
        required={required}
        labelText={labelText}
        isPassword={true}
        isError={isError}
        styleClass={`_password-label my-1`}
      >
        <div className={inputWithLabelText}>
          <Input
            id={htmlFor}
            type={isHideText ? "password" : "text"}
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
          <button
            disabled={disabled}
            onClick={() => {
              setIsHideText(!isHideText);
            }}
            type="button"
            className="_flex-center"
          >
            {
              <Image
                src={isHideText ? EyeOffIcon : EyeIcon}
                alt={isHideText ? "보기 아이콘" : "숨김 아이콘"}
                width={20}
                height={20}
              />
            }
          </button>
        </div>
      </Label>
      {isError ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : inputMessage ? (
        <InputMessage>{inputMessage}</InputMessage>
      ) : (
        ""
      )}
    </>
  ) : hasButton ? (
    <Label
      htmlFor={htmlFor}
      required={required}
      labelText={labelText}
      hasIcon={hasButton}
      isError={isError}
      // styleClass={setSize}
    >
      <div className={inputWithLabelText}>
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
          defaultValue={value}
        />
        <button
          onClick={() => setValue("")}
          type="reset"
          className="_flex-center"
          style={{ width: 20, height: 20 }}
        >
          {icon}
        </button>
      </div>
      {isError ? (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      ) : inputMessage ? (
        <InputMessage>{inputMessage}</InputMessage>
      ) : (
        ""
      )}
    </Label>
  ) : (
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
