import { useState } from "react";

type TProps = {
  defaultActiveId: string;
  idList: string[];
};

export default function useTabs({ defaultActiveId, idList }: TProps) {
  const [activeId, setActiveId] = useState(defaultActiveId);
  return {};
}
