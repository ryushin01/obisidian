import { RadioGroup } from "@/app/_components/button";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioButton } from "./Radio.stories";

const mock = [
  {
    id: "test1",
    name: "test",
    label: "라디오 1",
    defaultChecked: true,
    disabled: false,
  },
  {
    id: "test2",
    name: "test",
    label: "라디오 2",
    defaultChecked: false,
    disabled: true,
  },
  {
    id: "test3",
    name: "test",
    label: "radio 3",
    defaultChecked: false,
    disabled: false,
  },
  {
    id: "test4",
    name: "test",
    label: "radio 4",
    defaultChecked: false,
    disabled: false,
  },
];

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Kos/Button/Radio",
  component: RadioGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadioButtonGroup: Story = {
  args: {
    radioOptions: mock,
    label: "test",
  },
};
