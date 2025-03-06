"use client";

import React, { useState } from "react";
import { TStringKeyObj } from "@app/global";
import { BankTypeCode } from "@constants";
import { Loading } from "@components";
import { TabContainer } from "@components/tab";
import { BankComponent } from "@components/bank-list";
import BankList from "@components/bank-list/BankList";
import { TSelectedBank } from "@hooks/useBankList";
import { useBankListData } from "@libs";
import { TabPanel, TabPanels } from "@chakra-ui/tabs";

type TProps = {
  close: () => void;
  selectedBankObj: TSelectedBankObj;
  selectedBank: TSelectedBank;
  saveSelectBank: ({ bankCd, bankNm }: TSelectedBank) => void;
  bankTypeCodeList: BankTypeCode[];
  grpCd: "BANK_RF" | "BANK_CMMS" | "BANK_GB";
  bankList: TResBank[];
};

// 0 : 은행, 1 : 저축은행, 2 : 증권사, 3 : 카드사&캐피탈, 4 : 보험사

let initBankInfo = {
  chgDtm: "",
  chgMembNo: "",
  code: "888",
  codeNm: "기타은행",
  crtDtm: "",
  crtMembNo: "",
  etc1: "",
  etc2: null,
  etc3: null,
  grpCd: "",
  grpDesc: "",
  grpNm: "",
  num: 0,
  useYn: "Y",
};

const etcBank: TResBank = { ...initBankInfo, codeNm: "기타 은행" };
const etcSave: TResBank = { ...initBankInfo, codeNm: "기타 은행" };
const etcStock: TResBank = { ...initBankInfo, codeNm: "기타 증권사" };
const etcInsurance: TResBank = { ...initBankInfo, codeNm: "기타 보험사" };
const etc: TResBank = { ...initBankInfo, codeNm: "개인설정/신탁등기말소 등" };

export default function BankTabs({
  close,
  selectedBankObj,
  selectedBank,
  bankTypeCodeList,
  saveSelectBank,
  bankList,
  grpCd,
}: TProps) {
  const [prevBank, setPrevBank] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, results] = useBankListData({
    // grpCd: grpCd,
    grpCd: "BANK_GB",
    bankTypeCodeList,
  });

  const isAllBankListReady = results.length === 3;
  const etcObj: TStringKeyObj = {
    "0": etcBank,
    //"1": etcSave, // "1": etcSave, // "1" is not used in "bankTypeCodeList
    "2": etcStock,
    "4": etcInsurance,
  };
  const isEtcExist = bankTypeCodeList.includes(BankTypeCode.ETC);

  const handleClickBank = (el: TResBank) => {
    saveSelectBank({
      bankCd: el.code,
      bankNm: el.codeNm,
    });

    if (el.code) {
      close();
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {grpCd === "BANK_GB" && (
        <TabContainer
          onChange={setActiveIndex}
          className="w-screen h-full -mx-4"
        >
          <TabContainer.TabHeader
            className="w-screen h-13 flex justify-around"
            activeTab={activeIndex}
            tabNameOptions={[
              { name: "은행" },
              //{ name: "저축은행" },
              { name: "증권사" },
              { name: "보험사" },
              {
                name: "기타",
              },
            ]}
          />
          <TabPanels className="w-screen h-full">
            {!isLoading &&
              isAllBankListReady &&
              results?.map((result, i) => (
                <TabPanel
                  className="w-screen h-full overflow-y-scroll"
                  key={result[0].code}
                >
                  <BankList
                    bankList={[...result]}
                    handleClickBank={handleClickBank}
                    selectedBankList={selectedBankObj}
                    curSelectedBank={selectedBank}
                    isHeightFull={i === 0}
                  >
                    <BankComponent
                      bankInfo={etcObj[bankTypeCodeList[i]]}
                      handleClickBank={handleClickBank}
                      disabledBankList={selectedBankObj}
                      curSelectedBank={selectedBank}
                    />
                  </BankList>
                </TabPanel>
              ))}
            {isEtcExist && (
              <TabPanel>
                <div
                  className={`justify-center py-4 px-4 ${
                    isLoading ? "hidden" : "flex"
                  }`}
                >
                  <BankComponent
                    bankInfo={etc}
                    handleClickBank={handleClickBank}
                    disabledBankList={selectedBankObj}
                    curSelectedBank={selectedBank}
                  />
                </div>
              </TabPanel>
            )}
          </TabPanels>
        </TabContainer>
      )}

      {grpCd === "BANK_RF" && (
        <BankList
          bankList={bankList}
          handleClickBank={handleClickBank}
          selectedBankList={selectedBankObj}
          curSelectedBank={selectedBank}
        />
      )}
    </>
  );
}
