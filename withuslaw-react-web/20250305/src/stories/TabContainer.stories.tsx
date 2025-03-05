import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { TabPanels, TabPanel } from "@chakra-ui/tabs";
import { TabContainer } from "@/app/_components/tab";

const meta: Meta = {
  title: "Kos/Tab/TabContainer",
  component: TabContainer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: "disabled", description: "tab" },
    state: { control: "disabled" },
    onChange: { control: "disabled" },
    name: { control: "disabled" },
    className: { control: "disabled" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mock = [
  {
    name: "tab1",
  },
  {
    name: "tab2",
  },
];

const mock1 = [
  {
    name: "tab1",
  },
  {
    name: "tab2",
  },
];

const mock2 = [
  {
    name: "tab1",
  },
  {
    name: "tab2",
  },
];

const TabComponent = (args: Story) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <TabContainer onChange={(index) => setActiveTabIndex(index ?? 0)}>
      <TabContainer.TabHeader activeTab={activeTabIndex} {...args} />
      <TabPanels className="pt-5">
        <TabPanel>탭 내용 1</TabPanel>
        <TabPanel>탭 내용 2</TabPanel>
      </TabPanels>
    </TabContainer>
  );
};

export const TopTab: Story = {
  args: {
    tabNameOptions: mock,
    state: "default",
  },
  render: (args) => <TabComponent {...args} />,
};

export const ListTab: Story = {
  args: {
    tabNameOptions: mock1,
    state: "ListTab",
  },
  render: (args) => <TabComponent {...args} />,
};

export const CategoryTab: Story = {
  args: {
    tabNameOptions: mock2,
    state: "CategoryTab",
  },
  render: (args) => <TabComponent {...args} />,
};
