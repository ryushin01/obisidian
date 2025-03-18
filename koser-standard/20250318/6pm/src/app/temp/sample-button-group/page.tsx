"use client";

import { useState } from "react";
import { PERIOD_LIST } from "@constants/period";
import { ButtonGroup } from "@components/button";
import { getFakeData1 } from "@services/main";
import ChildComponent from "./component/ChildComponent";

export default function SampleButtonGroup() {
  const [selectedButtonGroup, setSelectedButtonGroup] = useState<boolean[]>([]);
  const [filteredData, setFilteredData] = useState({
    userId: null,
    id: null,
    title: "",
    completed: false,
  });

  /**
   * 버튼 그룹 내 index를 받아 선택 유무를 배열로 저장하고 index에 따라 다른 파라미터로 데이터 페칭하는 함수
   * @param {number} index
   */
  const handleButtonGroup = async (index: number) => {
    // 1. 상수 데이터와 동일한 길이의 새로운 배열을 생성하고, 모두 false로 채웁니다.
    const newArray: boolean[] = Array(PERIOD_LIST.length).fill(false);

    // 2. 선택한 버튼의 index를 받아 새로운 배열의 값 가운데 index 맞는 값을 true로 변경합니다.
    newArray[index] = true;

    // 3. 변경된 새로운 배열을 새로운 상태값으로 업데이트합니다.
    setSelectedButtonGroup(newArray);

    // 4. 데이터 페칭 시 index에 따라 다른 파라미터를 보내서 그 응답 값을 변수에 할당합니다.
    const response = await getFakeData1(index);

    // 5. 응답 값 가운데 데이터만 추출하고, 해당 데이터를 자식 컴포넌트로 전달합니다.
    setFilteredData(response?.data);
  };

  return (
    <>
      <div className="p-20">
        <ButtonGroup
          size="small"
          data={PERIOD_LIST}
          selectedButtonGroup={selectedButtonGroup}
          handleButtonGroup={handleButtonGroup}
        />
      </div>

      <ChildComponent filteredData={filteredData} />
    </>
  );
}
