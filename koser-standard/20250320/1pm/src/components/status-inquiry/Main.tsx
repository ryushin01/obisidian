"use client";

import { Typography } from "@components/common";
import { useResponsive } from "@hooks";
import List from "./List";

export default function Main() {
  const [isMobile] = useResponsive();

  return (
    <section>
      <Typography
        as="h2"
        kind={isMobile ? "title-large" : "headline-medium"}
        isBold={true}
        className={isMobile ? "pb-4" : "py-6"}
      >전자등기 현황조회</Typography>

      <List isMobile={isMobile} />
    </section>
  );
}