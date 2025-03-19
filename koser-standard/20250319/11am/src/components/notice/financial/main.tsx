"use client";

import { useState } from "react";
import { Pagination, Typography } from "@components/common";
import { useResponsive } from "@hooks";
import List from "./list";

export default function Main() {
  const [page, setPage] = useState(1);
  const [isMobile] = useResponsive();

  return (
    <section>
      <Typography
        as="h2"
        kind={isMobile ? "title-large" : "headline-medium"}
        isBold={true}
        className={isMobile ? "pb-4" : "py-6"}
      >공지사항</Typography>

      {/* TODO: List 컴포넌트로 데이터 전달 필요 */}
      <List />

      <Pagination
        total={153}
        page={page}
        limit={isMobile ? 5 : 10}
        pageCount={isMobile ? 5 : 10}
        setPage={setPage}
      />
    </section>
  );
}