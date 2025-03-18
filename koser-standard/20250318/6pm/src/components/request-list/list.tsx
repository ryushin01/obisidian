import { useState } from "react";
import { useRouter } from "next/navigation";
import { FI_REQUEST } from "@constants/path";
import { PageIndicator, Pagination } from "@components/common";
import { Grid, GridItem } from "@components/layout";
import { Button } from "@components/button";
import { ResponsiveType } from "@types";
import ListTable from "./list-table";

export default function List({ isMobile }: ResponsiveType) {
  const [page, setPage] = useState(1);
  const router = useRouter();

  return (
    <>
      <div className="mt-4 [&>div]:justify-end [&>div>div]:p-0">
        <Grid>
          <GridItem desktop={2} tablet={12} mobile={12}>
            <Button
              shape="solid"
              size="md"
              color="main100"
              onClick={() => router.push(FI_REQUEST)}>
              전자등기 의뢰하기
            </Button>
          </GridItem>
        </Grid>
      </div>

      <div className="_responsive-table-outer-wrapper">
        <PageIndicator total={180} page={5} limit={isMobile ? 5 : 10} />
        <ListTable isMobile={isMobile} />
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