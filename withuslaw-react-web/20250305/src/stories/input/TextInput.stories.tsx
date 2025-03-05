import { Input } from "@/app/_components";
import type { Meta, StoryObj } from "@storybook/react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Kos/Input",
  component: Input.TextInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    isCurrency: { control: "boolean" },
    isError: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  // decorators:[(Story)=><div style={{width:"100%"}}><Story/></div>]
} satisfies Meta<typeof Input.TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
  args: {
    isCurrency: true,
    isError: false,
    disabled: false,
    placeholder: "금액 입력",
  },
  decorators: [
    (Story) => (
      <div className="flex w-full">
        <div className="basis-1/2 flex flex-col px-5 pt-5 w-full">
          <h2 className="mb-2">Only Input</h2>
          <Input.InputContainer className="max-w-md">
            <Story />
          </Input.InputContainer>
          <h2 className="mt-4 mb-1">Input with Label</h2>
          <Input.InputContainer className="max-w-md">
            <Input.Label htmlFor="test" required={true}>
              취등록세
            </Input.Label>
            <Story />
          </Input.InputContainer>
        </div>
        <div className="basis-1/2 flex flex-col px-5 pt-5 w-full">
          <h2 className="mt-4 mb-1">Input with Label and Description</h2>
          <Input.InputContainer className="max-w-md">
            <Input.Label htmlFor="test">이름</Input.Label>
            <Story />
            <Input.Description isError={false}>
              이름은 공백없이 한글 또는 영문을 정확히 입력해주세요.
            </Input.Description>
          </Input.InputContainer>
          <h2 className="mt-4 mb-1">Input with Label and Error Description</h2>
          <Input.InputContainer className="max-w-md">
            <Input.Label htmlFor="test">이름</Input.Label>
            <Story />
            <Input.Description isError={true}>
              이름은 공백없이 한글 또는 영문을 정확히 입력해주세요.
            </Input.Description>
          </Input.InputContainer>
        </div>
      </div>
    ),
  ],
};
