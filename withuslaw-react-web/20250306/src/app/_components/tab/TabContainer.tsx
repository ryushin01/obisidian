"use client";

import React from "react";
import { TabHeader } from "@components/tab/TabHeader";
import { Tabs } from "@chakra-ui/tabs";

type TProps = {
  onChange: (index: number) => void;
  children?: React.ReactNode;
  className?: string;
  defaultIndex?: number;
};

const TabContainer = ({
  onChange,
  children,
  className,
  defaultIndex,
}: TProps) => {
  return (
    <Tabs
      as="section"
      className={`grow flex-col  ${className}`}
      display={"flex"}
      onChange={onChange}
      defaultIndex={defaultIndex}
    >
      {children}
    </Tabs>
  );
};

TabContainer.TabHeader = TabHeader;

export { TabContainer };
