"use client";

import { useState } from "react";
import { isMobile } from "react-device-detect";
import { Pagination } from "@/components/common";

export default function SamplePagination() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <Pagination
        total={70}
        page={page}
        limit={5}
        pageCount={isMobile ? 5 : 10}
        setPage={setPage}
      />
    </div>
  );
}
