import type { Meta } from "@storybook/react";
import Loading from "@/app/_components/Loading";

const meta = {
  title: "Kos/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Loading>;

export default meta;

export const Default = () => <Loading />;
