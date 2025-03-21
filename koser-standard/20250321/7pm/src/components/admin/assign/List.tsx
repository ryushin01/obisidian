import { useState } from "react";
import { Pagination } from "@components/common";
import { Grid, GridItem } from "@components/layout";
import { PERIOD_SORT_OPTION } from "@constants/option";
import { Select } from "@components/form";
// import Table from "./Table";

export default function List() {
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="_responsive-table-outer-wrapper [&>div>div]:p-0">
        <Grid className="justify-end">
          <GridItem mobile={12} tablet={12} desktop={3}>
            <Select
              id="select"
              name="select"
              selectSize="md"
              options={PERIOD_SORT_OPTION}
              value=""
              onChange={() => console.log("의뢰일 순")}
              isError={false}
            />
          </GridItem>
        </Grid>

        {/* select */}
        {/*<Table />*/}
        <Pagination
          total={180}
          page={page}
          limit={10}
          pageCount={10}
          setPage={setPage}
        />
      </div>
    </>
  );
}