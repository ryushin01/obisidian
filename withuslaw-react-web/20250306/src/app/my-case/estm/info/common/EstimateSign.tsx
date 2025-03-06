import React, { useEffect, useState } from "react";
import { Alert, Badge, Typography } from "@components";
import { Checkbox } from "@components/button";
import { useDisclosure } from "@hooks";
import { scrollToInput } from "@utils";
import { Sheet } from "react-modal-sheet";

type TSign = {
  seq: number;
  infoTtl: string;
  ptupCnts: string;
  bscInfoYn: string;
  memo: string;
};

type TProps = {
  clientForm: TEstimateSaveForm;
  searchCustEstmInfo?: any;
  handleChangeValue: (key: string, value: string) => void;
};

export default function EstimateSign({
  searchCustEstmInfo,
  handleChangeValue,
  clientForm,
}: TProps) {
  const [isSelectOpen] = useState(false);
  const [checkedItem, setCheckedItem] = useState<string | null>(null);
  const [isUserInputting, setIsUserInputting] = useState(false);
  const isIos = sessionStorage.getItem("isIos");
  const {
    isOpen: isOpenSelectSign,
    open: openSelectSign,
    close: closeSelectSign,
  } = useDisclosure();
  const {
    isOpen: isOpenChangeSign,
    open: openChangeSign,
    close: closeChangeSign,
  } = useDisclosure();

  const handleSelectValue = ({ infoTtl, ptupCnts, memo }: TSign) => {
    handleChangeValue("infoTtl", infoTtl);
    handleChangeValue("memo", ptupCnts);
  };

  const selectedInfo: TSign = searchCustEstmInfo?.find(
    (item: TSign) => item.bscInfoYn === "Y"
  );

  /** 처음 렌더링 시 기본 안내문 체크/내용 담기는 처리 */
  useEffect(() => {
    // 체크된 아이템이 없으면 첫번째 아이템으로
    if (!checkedItem && searchCustEstmInfo && searchCustEstmInfo.length > 0) {
      setCheckedItem(searchCustEstmInfo[0].infoTtl);
    }

    // 메모 초기값 설정
    if (!isUserInputting && clientForm?.memo === "") {
      handleChangeValue("memo", selectedInfo?.ptupCnts);
    }
  }, [
    selectedInfo,
    clientForm?.memo,
    handleChangeValue,
    isUserInputting,
    searchCustEstmInfo,
  ]);

  return (
    <div className="px-4 py-6">
      {
        <Alert
          isOpen={isOpenSelectSign}
          title={<p>견적서 안내문</p>}
          cancelText="취소"
          cancelCallBack={() => {
            close();
          }}
          confirmCallBack={() => {
            close();
          }}
          bodyText={`입력하신 안내문 내용이 지워지며 <br />
            새로운 안내문으로 대체됩니다.`}
        />
      }

      <div className="flex items-center justify-between">
        <Typography
          color={"text-kos-gray-800"}
          type={Typography.TypographyType.H2}
        >
          견적 안내문
        </Typography>
      </div>

      <div className="flex items-center justify-between mt-4 mb-4">
        <ul className="relative w-full mt-1">
          <li
            className={`p-4 border border-solid rounded-[16px] ${
              searchCustEstmInfo?.infoTtl == ""
                ? "border-kos-red-500"
                : "border-kos-gray-400"
            }`}
            onClick={() => {
              openChangeSign();
            }}
          >
            <div className="flex align-center justify-between">
              <p
                className={`text-[15px] font-normal ${
                  clientForm.infoTtl === "안내문을 선택해주세요."
                    ? "text-kos-gray-500"
                    : "text-kos-gray-800"
                }`}
              >
                {clientForm.infoTtl === ""
                  ? selectedInfo?.infoTtl
                  : clientForm.infoTtl}
              </p>
              <p
                className={`w-6 bg-no-repeat bg-down-arrow ${
                  isSelectOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </li>
          <Sheet
            className="border-none w-screen h-full"
            isOpen={isOpenChangeSign}
            onClose={closeChangeSign}
            detent={"content-height"}
            snapPoints={[0.65, 400, 100, 0]}
          >
            <Sheet.Container
              style={{
                boxShadow: "none",
                borderRadius: "20px 20px 0 0",
              }}
            >
              <Sheet.Header />

              <div className="py-4 text-center text-lg text-[#2E2E2E] font-semibold">
                <p>안내문을 선택해주세요</p>
              </div>
              <Sheet.Content
                className={`relative w-screen ${isIos ? "pb-5" : ""}`}
              >
                <div
                  className={`w-full p-4 pt-0 overflow-y-auto
      ${
        searchCustEstmInfo?.infoTtl
          ? "border-kos-red-500"
          : "border-kos-gray-400"
      }`}
                >
                  {!!searchCustEstmInfo &&
                    searchCustEstmInfo?.map((item: TSign) => (
                      <div
                        key={item.seq}
                        className="flex items-center justify-between"
                        onClick={() => {
                          handleSelectValue(item);
                          closeChangeSign();
                          setCheckedItem(item.infoTtl);
                        }}
                      >
                        <div
                          className={`pt-5 font-normal ${
                            item.infoTtl === checkedItem
                              ? "text-kos-gray-800 font-semibold"
                              : "text-kos-gray-600"
                          }`}
                        >
                          {item?.bscInfoYn === "Y" ? (
                            <div className="flex items-center">
                              <p className="mr-[10px]">{item.infoTtl}</p>
                              <Badge colorType="gray-white">기본 안내문</Badge>
                            </div>
                          ) : (
                            `${item.infoTtl}`
                          )}
                        </div>
                        {item.infoTtl === checkedItem && (
                          <Checkbox
                            size="Small"
                            id={checkedItem}
                            checked
                            onChange={() => setCheckedItem(item.infoTtl)}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop
              onTap={closeChangeSign}
              style={{ backgroundColor: "rgba(18, 18, 18, 0.60)" }}
            />
          </Sheet>
        </ul>
        <Typography
          color={"text-kos-gray-800"}
          type={Typography.TypographyType.H2}
        >
          {searchCustEstmInfo?.infoTtl}
        </Typography>
      </div>
      <textarea
        className="p-4 w-full h-[200px] border border-gray-300 rounded-xl text-md  focus:caret-[#FFBE5C] focus:outline-kos-orange-500 focus:shadow-inputFocus focus:border-kos-orange-500 focus:ring-1 focus:ring-kos-orange-500 text-[15px]"
        value={clientForm.memo}
        onChange={(e) => {
          setIsUserInputting(true);
          handleChangeValue("memo", e.target.value);
        }}
        onBlur={() => setIsUserInputting(false)}
        onFocus={scrollToInput}
      />
    </div>
  );
}
