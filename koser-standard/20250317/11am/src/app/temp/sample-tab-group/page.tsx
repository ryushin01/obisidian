"use client";

import TabGroup from "@components/common/TabGroup";
import { TAB_LIST } from "./data/data";

export default function SampleTabGroup() {
  const handleTabChange = (index: number) => {
    console.log(`Tab changed Index : ${index}`);
  };

  return (
    <TabGroup items={TAB_LIST} defaultTab={1} onTabChange={handleTabChange} />
  );
}
