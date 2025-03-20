import { ReactNode } from "react";
import { Typography } from "@components/common";
import "@styles/input.css";

type LabelProps = {
  htmlFor?: string;
  labelText?: string;
  children?: ReactNode;
  required?: boolean;
  isError?: boolean;
  isPassword?: boolean;
  styleClass?: string;
  hasIcon?: boolean;
};

/**
 * @name Label
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 * @property {string} htmlFor      - 인풋 id와 매치 시키는 라벨 속성을 정의합니다.
 * @property {string} labelText    - 라벨의 텍스트 내용을 정의합니다.
 * @property {ReactNode} children  - 라벨과 함께 배치되는 input을 정의합니다.
 * @property {boolean} required    - 라벨에 필수 표시 여부를 정의합니다.
 */
export default function Label({
                                htmlFor,
                                labelText,
                                // isPassword,
                                hasIcon,
                                children,
                                isError,
                                required,
                                styleClass,
                              }: LabelProps) {
  const labelStyle = `${isError ? "_error" : ""} ${
    hasIcon ? "_with-icon-label" : ""
  }`;
  // const labelStyle = `${isError ? "_error" : ""} ${
  //   hasIcon ? "_with-icon-label _text-input" : ""
  // }`;

  const style = [
    labelStyle,
    !htmlFor && labelText && "_only-label",
    htmlFor && !labelText && "_only-htmlFor",
    !htmlFor && !labelText && "_only-input",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      {!htmlFor ? (
        <label className={style}>
          {labelText && <Typography kind="title-small">{labelText}</Typography>}
          {labelText && required && (
            <span className="text-koser-secondary-red-50 pl-1">*</span>
          )}
          {children}
        </label>
      ) : (
        <div className={labelText ? styleClass : ""}>
          <label htmlFor={htmlFor} className={labelText ? "" : style}>
            {labelText && (
              <Typography kind="title-small">{labelText}</Typography>
            )}
            {labelText && required && (
              <span className="text-koser-secondary-red-50 pl-1">*</span>
            )}
          </label>
          {children}
        </div>
      )}
    </div>
  );
}
