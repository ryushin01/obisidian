import { FullRoundedButton } from "@/app/_components/button";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Kos/Button/FullRounded",
  component: FullRoundedButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    bgColor: {
      control: "select",
      options: ["bg-kos-orange-500", "bg-kos-white"],
    },
    textColor: {
      control: "select",
      options: ["text-kos-white", "text-kos-gray-500"],
    },
    children: { control: "text", description: "button text" },
  },
} satisfies Meta<typeof FullRoundedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
  args: {
    bgColor: "bg-kos-orange-500",
    textColor: "text-kos-white",
    children: "보정서류",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "16px" }}>
        <Story />
      </div>
    ),
  ],
};
