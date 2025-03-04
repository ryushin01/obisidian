"use client";

import { useState } from "react";
import { INTERESTS_LIST } from "./data/data";
import { ButtonGroup } from "@components/button";
import { getTestData } from "@services/main";

export default function SampleButtonGroup() {
  const [selectedButtonGroup, setSelectedButtonGroup] = useState<boolean[]>([]);

  /**
   * 버튼 그룹 내 index를 받아 선택 유무를 배열로 저장하고 index에 따라 다른 파라미터로 데이터 페칭하는 함수
   * @param {number} index
   */
  const handleButtonGroup = (index: number) => {
    // 1. 목업 데이터와 동일한 길이의 새로운 배열을 생성하고, 모두 false로 채웁니다.
    const newArray: boolean[] = Array(INTERESTS_LIST.length).fill(false);

    // 2. 선택한 버튼의 index를 받아 새로운 배열의 값 가운데 index 맞는 값을 true로 변경합니다.
    newArray[index] = true;

    // 3. 변경된 새로운 배열을 새로운 상태값으로 업데이트합니다.
    setSelectedButtonGroup(newArray);

    // 4. 데이터 페칭 시 index에 따라 다른 파라미터를 보내주면 됩니다.
    return getTestData(index);
  };

  return (
    <>
      <ButtonGroup
        size="small"
        data={INTERESTS_LIST}
        selectedButtonGroup={selectedButtonGroup}
        handleButtonGroup={handleButtonGroup}
      />
    </>
  );
}
