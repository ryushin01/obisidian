import { Input } from "@/app/_components";
import { useDatePicker } from "@/hooks";
import type { Meta, StoryObj } from "@storybook/react";

const DateInputGroup = (
  condition: Pick<TFillInfo, "startDate" | "endDate">
) => {
  const { ...props } = useDatePicker();
  return <Input.DateInputGroup {...props} condition={condition} />;
};

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Kos/Input",
  component: DateInputGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    startDate: { control: "text", description: "20231223" },
    endDate: { control: "text", description: "20231225" },
  },
  // decorators:[(Story)=><div style={{width:"100%"}}><Story/></div>]
} satisfies Meta<typeof DateInputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DateInput: Story = {
  args: {
    startDate: "20231223",
    endDate: "20231225",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};
