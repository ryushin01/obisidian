import { ReactNode, useState } from "react";
import "@styles/tab.css";

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
    <div className="_tab-container">
      <ul role="tablist" className="_tab-list">
        {items.map((tab, index) => (
          <li key={index} className="_tab-list-wrap">
            <button
              role="tab"
              // type="button"
              onClick={() => handleTabChange(index)}
              className="_tab-trigger"
            >
              {tab.label}
            </button>
            <div
              className={`_tab-border ${activeTab === index ? "active" : ""}`}
            ></div>
          </li>
        ))}
      </ul>
      <div className="_tab-content">{items[activeTab]?.content}</div>
    </div>
  );
}
