import { useState } from "react";
import { PERIOD_OPTION, STATUS_OPTION } from "@constants/option";
import { PERIOD_LIST } from "@constants/period";
import { DatePicker, Typography } from "@components/common";
import { Form, InputField, Select } from "@components/form";
import { Button, ButtonGroup } from "@components/button";
import { useDatePicker } from "@hooks";
import { ResponsiveType } from "@types";
import "@styles/filter-table.css";

export default function FilterTable({ isMobile }: ResponsiveType) {
  const { reset, ...datePickerProps } = useDatePicker();
  const [selectedButtonGroup, setSelectedButtonGroup] = useState<boolean[]>([]);
  // const [filteredData, setFilteredData] = useState({
  //   userId: null,
  //   id: null,
  //   title: "",
  //   completed: false,
  // });

  /**
   * 버튼 그룹 내 index를 받아 선택 유무를 배열로 저장하고 index에 따라 다른 파라미터로 데이터 페칭하는 함수
   * @param {number} index
   */
  const handleButtonGroup = async (index: number) => {
    // 1. 상수 데이터와 동일한 길이의 새로운 배열을 생성하고, 모두 false로 채웁니다.
    const newArray: boolean[] = Array(PERIOD_LIST.length).fill(false);

    // 2. 선택한 버튼의 index를 받아 새로운 배열의 값 가운데 index 맞는 값을 true로 변경합니다.
    newArray[index] = true;

    // 3. 변경된 새로운 배열을 새로운 상태값으로 업데이트합니다.
    setSelectedButtonGroup(newArray);

    // 4. 데이터 페칭 시 index에 따라 다른 파라미터를 보내서 그 응답 값을 변수에 할당합니다.
    // const response = await getFakeData1(index);

    // 5. 응답 값 가운데 데이터만 추출하고, 해당 데이터를 자식 컴포넌트로 전달합니다.
    // setFilteredData(response?.data);
  };

  return (
    <div className="_filter-table-wrapper">
      <Form
        onSubmit={() => console.log("submit")}
        legendText="전자등기 현황조회 검색 필터 양식"
        isHiddenLegend={true}
        onChange={() => console.log("change")}
      >
        <div className="_responsive-table-inner-wrapper _no-thead border-none">
          <table className="_responsive-table _col-8-type">
            <caption className="_hidden-table-caption">전자등기 현황조회 필터 표</caption>
            <tbody>
            <tr>
              <th>
                <Typography kind={isMobile ? "body-medium" : "title-small"} isBold={true}>의뢰번호</Typography>
              </th>
              <td>
                <InputField
                  name=""
                  defaultValue={""}
                  required={false}
                  placeholder={"의뢰번호를 입력해 주세요"}
                  isError={false}
                  inputSize="sm"
                />
              </td>
              <td colSpan={2} className="_hidden-in-mobile">&nbsp;</td>
              <th>
                <Typography kind={isMobile ? "body-medium" : "title-small"} isBold={true}>진행상태</Typography>
              </th>
              <td>
                <Select
                  id="select"
                  name="select"
                  options={STATUS_OPTION}
                  // value={selectedCountry}
                  // onChange={(e) => setSelectedCountry(e.target.value)}
                  isError={false}
                />
              </td>
              <th className="_hidden-in-mobile">
                <Typography kind={isMobile ? "body-medium" : "title-small"} isBold={true}>접수번호</Typography>
              </th>
              <td className="_hidden-in-mobile">
                <InputField
                  name=""
                  defaultValue={""}
                  required={false}
                  placeholder={"접수번호를 입력해 주세요"}
                  isError={false}
                  inputSize="sm"
                />
              </td>
            </tr>
            <tr>
              <th>
                <Typography kind={isMobile ? "body-medium" : "title-small"} isBold={true}
                            className="_hidden-in-desktop">조회기간</Typography>

                <Select
                  id="select"
                  name="select"
                  shape={isMobile ? "default" : "none"}
                  options={PERIOD_OPTION}
                  // value={selectedCountry}
                  // onChange={(e) => setSelectedCountry(e.target.value)}
                  isError={false}
                  className={isMobile ? "body-medium" : "title-small"}
                />
              </th>
              <td colSpan={3}>
                <span className="_datepicker-and-button-group-wrapper">
                  <DatePicker id="execution-date" {...datePickerProps} isMultiComponent={true} />

                  <ButtonGroup
                    size="small"
                    data={PERIOD_LIST}
                    selectedButtonGroup={selectedButtonGroup}
                    handleButtonGroup={handleButtonGroup}
                  />
                </span>
              </td>
              <th className="_hidden-in-mobile">
                <Typography kind={isMobile ? "body-medium" : "title-small"} isBold={true}>채무자</Typography>
              </th>
              <td className="_hidden-in-mobile">
                <InputField
                  name=""
                  defaultValue={""}
                  required={false}
                  placeholder={"채무자를 입력해 주세요"}
                  isError={false}
                  inputSize="sm"
                />
              </td>
              <td colSpan={2} className="_hidden-in-mobile">&nbsp;</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="_button-wrap">
          <Button
            shape="solid"
            size="md"
            color="main100"
            onClick={() => console.log("검색")}>
            검색
          </Button>
          <Button
            type="reset"
            shape="outline"
            size="md"
            color="grayscale"
            onClick={reset}>
            초기화
          </Button>
        </div>
      </Form>
    </div>
  );
}