import { SearchBar } from "@/app/_components";
import { keywordStore } from "@/app/_store";
import type { Meta, StoryObj } from "@storybook/react";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

const SearchBarTemplate = ({ searchValue }: { searchValue: string }) => {
  const setKeyword = useSetAtom(keywordStore);

  useEffect(() => {
    setKeyword({ value: searchValue });
  }, [searchValue]);
  return <SearchBar />;
};

const meta = {
  title: "Kos/SearchBar",
  component: SearchBarTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: { searchValue: { control: "text" } },
} satisfies Meta<typeof SearchBarTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchBarStory: Story = {
  args: { searchValue: "" },
  decorators: (Story) => (
    <div style={{ padding: "20px" }}>
      <Story />
    </div>
  ),
};
