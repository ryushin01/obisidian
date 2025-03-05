import { ChangeEvent, ReactNode } from "react";

type FormProps = {
  onSubmit: () => void;
  onChange?: (event: ChangeEvent<HTMLFormElement>) => void;
  legendText: string;
  children?: ReactNode;
  isHiddenLegend?: boolean;
};

/**
 * @name Form
 * @version 1.0.0
 * @author 홍다인 <hdi0104@bankle.co.kr>
 * @property {function} onSubmit      - 데이터 전송 이벤트 동작을 정의합니다.
 * @property {function} onChange      - 데이터 입력 이벤트 동작을 정의합니다.
 * @property {string} legendText      - legend에 사용 될 텍스트를 정의합니다.
 * @property {ReactNode} children     - 라벨과 함께 배치되는 input을 정의합니다.
 * @property {boolean} isHiddenLegend - legend 숨김/노출을 정의합니다.
 */
export default function Form({
  children,
  onSubmit,
  onChange,
  legendText,
  isHiddenLegend = true,
}: FormProps) {
  const hiddenLegend = isHiddenLegend ? "_hidden" : "";
  return (
    <form onSubmit={onSubmit} onChange={onChange}>
      <fieldset>
        <legend className={hiddenLegend}>{legendText}</legend>
        {children}
      </fieldset>
    </form>
  );
}
