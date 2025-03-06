import React from "react";
import { Tabs, Tab } from "@chakra-ui/tabs";

type TProps = {
  onChange?: (index?: number) => void;
  children?: React.ReactNode;
  activeTab?: string | boolean;
  className?: string;
  state?: "TopTab" | "ListTab" | "CategoryTab";
};

export default function TabComponent({
  onChange,
  children,
  activeTab,
  className,
  state,
}: TProps) {
  const TabBg = (function () {
    switch (state) {
      case "ListTab":
        return "bg-kos-gray-100 rounded-xl";
      case "CategoryTab":
        return "bg-transparent";
      default:
        return "bg-kos-white";
    }
  })();

  const TabType = function () {
    switch (state) {
      case "ListTab":
        return (
          <Tab
            borderRadius={activeTab ? "12px" : ""}
            background={activeTab ? "white" : ""}
            boxSizing={"content-box"}
            textColor={activeTab ? "#2E2E2E" : "#A3A3A3"}
            fontWeight={"600"}
            className={`text-center basis-1/2 h-13 mx-1 my-[3px]`}
          >
            {children}
          </Tab>
        );
      case "CategoryTab":
        return (
          <Tab
            background={activeTab ? "#FFF8EE" : ""}
            border={activeTab ? "" : "1px solid #D9D9D9"}
            boxSizing={"content-box"}
            textColor={activeTab ? "#F90" : "#A3A3A3"}
            fontWeight={activeTab ? "600" : "500"}
            className={`text-center text-[15px] basis-1/2 h-13 rounded-xl ${className}`}
          >
            {children}
          </Tab>
        );
      default:
        return (
          <Tab
            borderBottom={activeTab ? "2px solid #121212" : "1px solid #EAEAEA"}
            boxSizing={"content-box"}
            textColor={activeTab ? "black" : "#A3A3A3"}
            fontWeight={"600"}
            className={`text-center basis-1/2 h-13 ml-4`}
          >
            {children}
          </Tab>
        );
    }
  };

  return (
    <Tabs
      as="section"
      className={`grow flex-col overflow-y-hidden ${TabBg}`}
      display={"flex"}
      onChange={onChange}
    >
      <TabType />
    </Tabs>
  );
}
