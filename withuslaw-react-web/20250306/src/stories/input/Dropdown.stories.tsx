import { Input } from "@/app/_components";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Kos/Input",
  component: Input.Dropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text", description: "placeholder" },
    value: { control: "text", description: "value" },
    onClick: { control: "disabled" },
    disabled: { control: "boolean" },
  },
  // decorators:[(Story)=><div style={{width:"100%"}}><Story/></div>]
} satisfies Meta<typeof Input.Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dropdown: Story = {
  args: {
    placeholder: "담당자 선택",
    onClick: () => alert("바텀 시트 열릴 예정!"),
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col px-5 pt-5 w-full">
        <h2 className="mb-2">Only Dropdown</h2>
        <Input.InputContainer className="max-w-md">
          <Story />
        </Input.InputContainer>
        <h2 className="mt-4 mb-1">Dropdown with Label</h2>
        <Input.InputContainer className="max-w-md">
          <Input.Label htmlFor="test" required={true}>
            담당자
          </Input.Label>
          <Story />
        </Input.InputContainer>
      </div>
    ),
  ],
};
