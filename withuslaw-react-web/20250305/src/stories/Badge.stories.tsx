import type { Meta, StoryObj } from "@storybook/react";
import { BadgeColorType } from "@/app/_components/Constants";
import Badge from "@/app/_components/Badge";

const meta = {
  title: "Kos/badge/badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    colorType: {
      control: "radio",
      optoins: [BadgeColorType.blue, BadgeColorType.green],
    },
    children: { control: "text", description: "badge text" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colorType: BadgeColorType.blue,
    children: "이전",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "16px" }}>
        <Story />
      </div>
    ),
  ],
};
