import { ChangeEvent, useState } from "react";
import { ChangeInputType } from "@types";

/**
 * @name useCheckbox
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 */

export default function useCheckbox(): [boolean, ChangeInputType] {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) =>
    setIsChecked(event.target.checked);

  return [isChecked, handleCheckbox];
}
