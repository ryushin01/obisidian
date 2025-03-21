import { ChangeEvent, useState } from "react";
import { ChangeInputType } from "@types";

/**
 * @name useRadio
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 * @property {string} initValue   - 초기 선택값
 */

export default function useRadio(initValue: string | number): [string | number, ChangeInputType] {
  const [radioValue, setRadioValue] = useState(initValue);

  const handleRadio = (event: ChangeEvent<HTMLInputElement>) =>
    setRadioValue(event.target.value);

  return [radioValue, handleRadio];
}
