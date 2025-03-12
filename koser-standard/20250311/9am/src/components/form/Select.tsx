import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import "@styles/select.css";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  id?: string;
  isError?: boolean;
  disabled?: boolean;
  name: string;
  value: string;
  options?: SelectOption[];
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  "className" | "onChange"
>;

/**
 * @name Select
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 * @property {string} id           - 셀렉트 id를 정의합니다.
 * @property {boolean} isError     - 셀렉트의 에러 상태를 정의합니다.
 * @property {boolean} disabled    - 셀렉트의 비활성화 상태를 정의합니다.
 * @property {string} name         - form에 담길 셀렉트의 이름을 정의합니다.
 * @property {string} value        - 선택된 값을 정의합니다.
 * @property {string} label        - 선택된 값의 라벨을 정의합니다.
 * @property {function} options    - 셀렉트 선택 옵션들을 정의합니다.
 * @property {function} onChange   - 셀렉트 동작 위해 정의합니다.
 */

export default function Select({
  id,
  options,
  name,
  value,
  isError = false,
  disabled,
}: SelectProps) {
  const [selectValue, setSelectValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
  };
  console.log(selectValue);
  const style = `_select ${
    isError ? "border-koser-secondary-red-50" : "border-koser-grayscale-40"
  } ${disabled ? "_disabled" : ""}`;

  return (
    <label className={style}>
      <select
        id={id}
        name={name}
        value={selectValue}
        disabled={disabled}
        onChange={handleChange}
        className={style}
      >
        <optgroup>
          {options?.map((option, index) => (
            <option key={`${option.value}${index}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </optgroup>
      </select>
    </label>
  );
}
