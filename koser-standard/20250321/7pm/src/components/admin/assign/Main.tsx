"use client";

import { Badge, TabGroup, Typography } from "@components/common";
import { Grid, GridItem } from "@components/layout";
import { Form, InputField } from "@components/form";
import { REQUEST_NUMBER_INPUT } from "@constants/input";
import { Button } from "@components/button";
import List from "./List";

export default function Main() {
  const TAB_LIST = [
    {
      label: "미배정",
      content: <List />,
    },
    {
      label: "배정완료",
      content: "2번 데이터",
    },
    {
      label: "진행보류",
      content: "3번 데이터",
    },
    {
      label: "진행취소",
      content: "4번 데이터",
    },
  ];

  const handleTabChange = (index: number) => {
    console.log(`Tab changed Index : ${index}`);
  };

  return (
    <section className="pb-5">
      <div className="flex items-center gap-x-[10px]">
        <Typography
          as="h2"
          kind="headline-medium"
          isBold={true}
          className="py-6"
        >배정관리 목록</Typography>

        <Badge type="text" colorType="default">미배정 7건</Badge>
      </div>

      {/* form - button */}
      <div className="[&>div>div]:p-0">
        <Grid className="justify-between">
          <GridItem mobile={12} tablet={12} desktop={6}>
            <Form
              onSubmit={() => console.log("submit")}
              onChange={() => console.log("change")}
              legendText="의뢰번호 검색"
              isHiddenLegend={true}
              className="[&>fieldset]:flex [&>fieldset]:gap-x-3 [&>fieldset>div]:mr-1"
            >
              <InputField
                name=""
                defaultValue=""
                type="number"
                inputSize="md"
                required={false}
                placeholder={REQUEST_NUMBER_INPUT.placeHolder}
                isError={false}
                // disabled={true}
              />
              <Button
                shape="solid"
                size="md"
                color="main100"
                onClick={() => console.log("검색")}
              >
                검색
              </Button>
              <Button
                type="reset"
                shape="outline"
                size="md"
                color="grayscale"
              >
                초기화
              </Button>
            </Form>
          </GridItem>

          <GridItem mobile={12} tablet={12} desktop={2}>
            <Button
              shape="solid"
              size="md"
              color="main100"
              onClick={() => console.log("전자등기 신규등록 페이지 이동")}
            >
              전자등기 신규등록
            </Button>
          </GridItem>
        </Grid>
      </div>
      
      <TabGroup
        items={TAB_LIST}
        defaultTab={0}
        onTabChange={handleTabChange}
      />
    </section>
  );
}