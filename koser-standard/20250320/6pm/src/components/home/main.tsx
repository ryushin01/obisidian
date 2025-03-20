"use client";

import { useResponsive } from "@hooks";
import Banner from "./banner";
import Contents from "./contents";
import "@styles/home.css";

export default function Main() {
  const [isMobile] = useResponsive();

  return (
    <div className="_main">
      <div className="_banner-section">
        <Banner
          name="성북신협"
          totalcount={100}
          inprogress={10}
          application={90}
        />
      </div>

      <div className={`_contents-section ${isMobile ? "min-h-[70vw]" : ""} `}>
        <Contents isMobile={isMobile} />
      </div>
    </div>
  );
}
