import { CtaButton } from "@/app/_components/button";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Kos/Button/CTA",
  component: CtaButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text", description: "button text" },
  },
  // decorators:[(Story)=><div style={{width:"100%"}}><Story/></div>]
} satisfies Meta<typeof CtaButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const XlargeButton: Story = {
  args: {
    size: "XLarge",
    state: "On",
    children: "선택완료",
  },
  argTypes: {
    size: { control: "radio", options: ["XLarge"] },
    state: {
      control: "radio",
      options: ["None", "On"],
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

export const LargeButton: Story = {
  args: {
    size: "Large",
    state: "Default",
    children: "선택완료",
  },
  argTypes: {
    size: { control: "radio", options: ["Large"] },
    state: {
      control: "radio",
      options: ["Default", "None"],
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

export const MediumButton: Story = {
  args: {
    size: "Medium",
    state: "Default",
    children: "선택완료",
  },
  argTypes: {
    size: { control: "radio", options: ["Medium"] },
    state: {
      control: "radio",
      options: ["Default"],
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

export const SmallButton: Story = {
  args: {
    size: "Small",
    state: "Default",
    children: "선택완료",
  },
  argTypes: {
    size: { control: "radio", options: ["Small"] },
    state: {
      control: "radio",
      options: ["Default", "None"],
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

export const TinyButton: Story = {
  args: {
    size: "Tiny",
    state: "Default",
    children: "선택완료",
  },
  argTypes: {
    size: { control: "radio", options: ["Tiny"] },
    state: {
      control: "radio",
      options: ["Default"],
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
