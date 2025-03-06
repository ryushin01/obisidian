import { useCallback, useState } from "react";

/**
 * @name useCheckboxes
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 부모 컴포넌트가 클라이언트 컴포넌트이어야 합니다.
 */

export default function useCheckboxes(): [string[], (checkbox: string, checked: boolean) => void] {
  const [checkedList, setCheckedList] = useState<Array<string>>([]);

  // TODO: 주석 추가
  const handleCheckboxes = useCallback(
    (checkbox: string, checked: boolean) => {
      if (checked) {
        setCheckedList((prev) => [...prev, checkbox]);
      } else if (!checked) {
        setCheckedList(checkedList.filter((element) => element !== checkbox));
      }
    },
    [checkedList],
  );

  return [checkedList, handleCheckboxes];
}
