import React from "react";
import { Tab } from "@chakra-ui/tabs";

type TActiveTab = {
  activeTab: number;
  index: number;
  state?: "TopTab" | "ListTab" | "CategoryTab";
};

export type TTabName = {
  name: string;
  className?: string;
};

/**
 * TopTab은 최상단 탭, ListTab은 리스트 탭, CategoryTab은 카테고리 탭,
 * children에 탭 제목 내용 입력 가능
 *
 */

export default function TabName({
  name,
  activeTab,
  className,
  index,
  state,
}: TTabName & TActiveTab) {
  const TabType = function () {
    const defaultClassName = "text-xs px-1 py-0.5 rounded font-semibold ";
    const isActive = activeTab === index;
    switch (state) {
      case "ListTab":
        return (
          <Tab
            borderRadius={isActive ? "12px" : ""}
            background={isActive ? "white" : ""}
            boxSizing={"content-box"}
            textColor={isActive ? "#2E2E2E" : "#A3A3A3"}
            fontWeight={"600"}
            className={`shrink-0 basis-1/2 text-center h-[46px]`}
            name={name}
          >
            {name}
          </Tab>
        );
      case "CategoryTab":
        return (
          <Tab
            background={isActive ? "#FFF8EE" : ""}
            border={isActive ? "" : "1px solid #D9D9D9"}
            boxSizing={"content-box"}
            textColor={isActive ? "#F90" : "#A3A3A3"}
            fontWeight={isActive ? "600" : "500"}
            className={`shrink-0 basis-1/2 text-center text-[15px] h-13 rounded-xl ${className}`}
            name={name}
          >
            {name}
          </Tab>
        );
      default:
        return (
          <Tab
            boxShadow={isActive ? "inset 0 -2px 0 #121212" : ""}
            boxSizing={"content-box"}
            textColor={isActive ? "black" : "#A3A3A3"}
            fontWeight={"600"}
            className={`shrink-0 basis-1/2 text-center h-13 ${className}`}
            name={name}
          >
            {name}
          </Tab>
        );
    }
  };

  return <TabType />;
}
