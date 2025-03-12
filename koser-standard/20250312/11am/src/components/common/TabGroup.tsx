import { ReactNode, useState } from "react";

type TabItem = {
  label: string;
  content: ReactNode;
};

type TabGroupProps = {
  items: TabItem[];
  defaultTab?: number;
  onTabChange?: (index: number) => void;
};

export default function TabGroup({
  items,
  defaultTab,
  onTabChange,
}: TabGroupProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || 0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    onTabChange?.(index);
  };

  return (
    <div className="tabContainer">
      <div className="tabList">
        {items.map((tab, index) => (
          <button
            key={index}
            type="button"
            className={`${activeTab === index ? "active" : ""}`}
            onClick={() => handleTabChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabContent">{items[activeTab]?.content}</div>
    </div>
  );
}
