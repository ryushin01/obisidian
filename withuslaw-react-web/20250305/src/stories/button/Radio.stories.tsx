import { RadioGroup } from "@/app/_components/button";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Kos/Button/Radio",
  component: RadioGroup.Radio,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    id: { control: "disabled" },
    name: { control: "disabled" },
    label: { control: "text", description: "label" },
    defaultChecked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof RadioGroup.Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioButton: Story = {
  args: {
    id: "test1",
    name: "test",
    label: "총 5개",
    defaultChecked: true,
    disabled: false,
  },
  render: (args) => <RadioGroup.Radio {...args} />,
};
