"use client";

import { TabGroup, Typography } from "@components/common";
import { useResponsive } from "@hooks";
import List from "./list";

export default function Main() {
  const [isMobile] = useResponsive();

  const TAB_LIST = [
    {
      label: "미배정",
      content: <List isMobile={isMobile} />,
    },
    {
      label: "배정완료",
      content: "2번 데이터",
    },
    {
      label: "진행보류",
      content: "3번 데이터",
    },
    {
      label: "진행취소",
      content: "4번 데이터",
    },
  ];

  const handleTabChange = (index: number) => {
    console.log(`Tab changed Index : ${index}`);
  };

  return (
    <section>
      <Typography
        as="h2"
        kind={isMobile ? "title-large" : "headline-medium"}
        isBold={true}
        className={isMobile ? "pb-4" : "py-6"}
      >전자등기 의뢰목록</Typography>

      <TabGroup
        items={TAB_LIST}
        defaultTab={0}
        onTabChange={handleTabChange}
        isMobile={isMobile}
      />
    </section>
  );
}