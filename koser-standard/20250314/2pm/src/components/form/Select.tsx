import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import "@styles/select.css";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  id: string;
  isError?: boolean;
  disabled?: boolean;
  name: string;
  value: string;
  selectSize: "xs" | "sm" | "md" | "lg";
  options?: SelectOption[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  "className"
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
  isError,
  selectSize,
  disabled,
  onChange,
}: SelectProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  let setSize = "";
  switch (selectSize) {
    case "xs":
      setSize = "py-0.5 text-[14px]";
      break;
    case "sm":
      setSize = "py-1.5 text-[14px]";
      break;
    case "md":
      setSize = "py-2.5 text-[16px]";
      break;
    case "lg":
      setSize = "py-3 text-[18px]";
      break;
    default:
      setSize = "py-1.5 text-[14px]";
  }

  const style = `_select ${isError ? "_error" : ""} ${setSize}`;

  return (
    <label>
      <select
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className={style}
      >
        {options?.map((option: SelectOption, index: number) => (
          <option key={`${option.value}${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
