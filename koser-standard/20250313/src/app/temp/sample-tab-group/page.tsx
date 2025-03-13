"use client";

import Image from "next/image";
import { Image1, Image2, Image3 } from "@images";
import TabGroup from "@components/common/TabGroup";

export default function SampleTabGroup() {
  const tabItems = [
    {
      label: "Tab1",
      content: <Image src={Image1} alt="1번 이미지" />,
    },
    {
      label: "Tab2",
      content: <Image src={Image2} alt="2번 이미지" />,
    },
    {
      label: "Tab3",
      content: <Image src={Image3} alt="3번 이미지" />,
    },
  ];

  const handleTabChange = (index: number) => {
    console.log(`Tab changed Index : ${index}`);
  };

  return (
    <TabGroup items={tabItems} defaultTab={1} onTabChange={handleTabChange} />
  );
}
