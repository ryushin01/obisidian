import { ReactNode, useState } from "react";
import { Typography } from "@components/common";
import { useResponsive } from "@hooks";
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

/**
 * @name TabGroup
 * @version 1.2.0
 * @author 이은희 <leun1013@bankle.co.kr>
 *         홍다인 <hdi0104@bankle.co.kr>
 *         류창선 <zero.ryushin@bankle.co.kr>
 */
export default function TabGroup({
                                   items,
                                   defaultTab,
                                   onTabChange,
                                 }: TabGroupProps) {
  const [isMobile] = useResponsive();
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
              type="button"
              role="tab"
              onClick={() => handleTabChange(index)}
              className="_tab-trigger"
            >
              <Typography kind={isMobile ? "body-large" : "title-large"}
                          isBold={activeTab === index}>{tab.label}</Typography>
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
