import "@styles/textarea.css";
import { ChangeEvent, useState } from "react";

type TextAreaProps = {
  id?: string;
  name: string;
  isError: boolean;
  disabled?: boolean;
  children?: string;
  placeholder: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

/**
 * @name TextArea
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 * @property {string} id             - 텍스트박스 id를 정의합니다.
 * @property {string} name           - form에 담길 텍스트박스의 이름을 정의합니다.
 * @property {boolean} isError       - 텍스트박스의 에러 상태를 정의합니다.
 * @property {boolean} disabled      - 텍스트박스의 비활성화 상태를 정의합니다.
 * @property {string} defaultValue   - 텍스트박스의 기본값을 정의합니다.
 * @property {function} onChange     - 텍스트박스 입력 동작 위해 정의합니다.
 */

export default function TextArea({
  id,
  name,
  isError,
  children,
  placeholder,
  onChange,
  disabled,
}: TextAreaProps) {
  const [countLength, setCountLength] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      setCountLength(e.target.value.length);
      onChange(e);
    }
  };

  const style = `_text-area ${isError ? "_error" : ""}`;
  const countStyle = `_count-text ${countLength > 0 ? "_active" : ""}`;

  return (
    <label className="_label">
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        className={style}
        onChange={handleChange}
        disabled={disabled}
      >
        {children}
      </textarea>
      <p className="_count">
        <span className={countStyle}>{countLength}</span>
        <span className="_total-text">/100 자</span>
      </p>
    </label>
  );
}
