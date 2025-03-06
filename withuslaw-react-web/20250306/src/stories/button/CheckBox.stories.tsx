import { Size } from "@/app/_components/Constants";
import { Checkbox } from "@/app/_components/button";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Kos/Button/CheckBox",
  component: Checkbox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: [Size.Big, Size.Small] },
    id: { control: "text", description: "id" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    fontSize: { control: "select", options: ["H4", "B4"] },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CheckBox: Story = {
  args: {
    size: Size.Big,
    id: "checkbox",
    disabled: false,
    fontSize: "H4",
    label: "총 5개",
  },
};
