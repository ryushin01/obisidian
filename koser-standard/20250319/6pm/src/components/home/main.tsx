"use client";

import { useResponsive } from "@hooks";
import Banner from "./banner";
import Contents from "./contents";

export default function Main() {
  const [isMobile] = useResponsive();

  return (
    <div className="relative min-h-[calc(100vh-80px)] pb-[80px]">
      <div className="relative z-0">
        <Banner
          name="성북신협"
          totalcount={100}
          inprogress={10}
          application={90}
        />
      </div>

      <div
        className={`absolute left-1/2 transform -translate-x-1/2 w-full z-8 bg-white shadow-lg border rounded-3xl p-6 transition-all ${
          isMobile
            ? "top-[440px] min-h-[70vw] mb-40"
            : "top-[280px] min-h-[30vw]"
        } `}
      >
        <Contents isMobile={isMobile} />
      </div>
    </div>
  );
}
