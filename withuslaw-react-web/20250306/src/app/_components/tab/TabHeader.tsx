"use client";

import React from "react";
import TabName, { TTabName } from "@components/tab/TabName";
import { TabList } from "@chakra-ui/tabs";

type TProps = {
  className?: string;
  state?: "TopTab" | "ListTab" | "CategoryTab";
  tabNameOptions?: TTabName[];
  activeTab: number;
};

const TabHeader = ({ className, tabNameOptions, state, activeTab }: TProps) => {
  const TabBg = (function () {
    switch (state) {
      case "ListTab":
        return "bg-kos-gray-100 rounded-xl px-1 py-[3px]";
      case "CategoryTab":
        return "bg-transparent";
      default:
        return "bg-kos-white border-b border-solid border-gray-300";
    }
  })();

  const flexBasis = `basis-1/${tabNameOptions?.length}`;

  return (
    <TabList className={`${TabBg} ${className} w-full`}>
      {tabNameOptions?.map((option, i) => (
        <TabName
          key={option.name}
          activeTab={activeTab}
          index={i}
          state={state}
          className={flexBasis}
          {...option}
        />
      ))}
    </TabList>
  );
};

TabHeader.TabName = TabName;

export { TabHeader };
