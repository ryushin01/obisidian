import type { Meta, StoryObj } from "@storybook/react";
import Alert from "@/app/_components/Alert";
import { useDisclosure } from "@/hooks";

const meta: Meta<typeof Alert> = {
  title: "Kos/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text", description: "title text" },
    cancelText: { control: "text", description: "content text" },
    confirmText: { control: "text", description: "content text" },
    bodyText: { control: "text", description: "content text" },
    isOpen: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const AlertHooks = () => {
  const { open } = useDisclosure();

  return (
    <button
      className="bg-kos-orange-500 p-4 text-white rounded-xl"
      onClick={() => open()}
    >
      Alert 창
    </button>
  );
};

export const Default: Story = {
  args: {
    bodyText: "모달 내용",
    title: "모달 타이틀 제목",
    cancelText: "취소",
    confirmText: "확인",
    isOpen: true,
  },
  render: (args: any) => (
    <>
      <AlertHooks {...args} /> <Alert {...args} isOpen />
    </>
  ),
};
