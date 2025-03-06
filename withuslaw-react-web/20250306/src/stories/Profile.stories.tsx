import type { Meta, StoryObj } from "@storybook/react";
import Profile from "@/app/_components/Profile";

const meta = {
  title: "Kos/Profile",
  component: Profile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isProfile: "Empty",
    imgSeq: "",
  },
  argTypes: {
    isProfile: {
      control: "radio",
      options: ["Empty", "Full"],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "16px" }}>
        <Story />
      </div>
    ),
  ],
};
