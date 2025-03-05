import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ToastModal from "@/app/ToastModal";
import { toastState } from "@/app/_store/toastStore";
import { useSetAtom } from "jotai";
import { ToastType } from "@/app/_components/Constants";

const meta: Meta<typeof ToastModal> = {
  title: "Kos/ToastModal",
  component: ToastModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    msg: { control: "text", description: "msg" },
    status: {
      control: "radio",
      options: [ToastType.success, ToastType.error, ToastType.notice],
    },
    dim: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ToastModal>;

const ToastHooks = (props: any) => {
  const callToast = useSetAtom(toastState);

  return (
    <>
      <button
        className="bg-kos-orange-500 p-4 text-white rounded-xl"
        onClick={() => {
          callToast({
            msg: props.msg,
            status: props.status,
            dim: props.dim,
          });
        }}
      >
        토스트 모달
      </button>
    </>
  );
};

export const Default: Story = {
  args: {
    msg: "토스트 모달 내용 입력",
    status: "success",
    dim: false,
  },
  render: (args: any) => (
    <>
      <ToastHooks {...args} /> <ToastModal />
    </>
  ),
};
