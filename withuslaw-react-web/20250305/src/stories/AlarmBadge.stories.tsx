import type { Meta } from "@storybook/react";
import AlarmBadge from "@/app/_components/AlarmBadge";

const meta = {
  title: "Kos/badge/AlarmBadge",
  component: AlarmBadge,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AlarmBadge>;

export default meta;

export const Default = () => (
  <div className="relative">
    <h3>공지사항</h3>
    <AlarmBadge />
  </div>
);
