import { useState } from "react";
import { PageIndicator, Pagination } from "@components/common";
import { ResponsiveType } from "@types";
import FilterTable from "./FilterTable";
import Table from "./Table";

export default function List({ isMobile }: ResponsiveType) {
  const [page, setPage] = useState(1);

  return (
    <>
      <FilterTable isMobile={isMobile} />

      <div className="_responsive-table-outer-wrapper">
        <PageIndicator total={180} page={5} limit={isMobile ? 5 : 10} />
        <Table isMobile={isMobile} />
        <Pagination
          total={180}
          page={page}
          limit={isMobile ? 5 : 10}
          pageCount={isMobile ? 5 : 10}
          setPage={setPage}
        />
      </div>
    </>
  );
}