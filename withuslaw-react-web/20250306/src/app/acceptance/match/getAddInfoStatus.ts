import { AddInfo } from "@constants";

/** 이전등기 가능여부 조회 */
export const getAddInfoStatus = (trregElement: TObj) => {
  const { CMMS_ACCT, ELREG_ID, PROFI_IMG, ISRN_ENTR } = AddInfo;
  const {
    [CMMS_ACCT]: cmmsAcctYn,
    [ELREG_ID]: elregIdYn,
    [PROFI_IMG]: profiImgYn,
    [ISRN_ENTR]: isrnEntrAprvGbCd,
  } = trregElement || {};

  return {
    isBank: cmmsAcctYn === "Y",
    isFormId: elregIdYn === "Y",
    isProfile: profiImgYn === "Y",
    isrnEntrBefore: isrnEntrAprvGbCd === "00",
    isrnEntrRequest: isrnEntrAprvGbCd === "01",
    isrnEntrReturn: isrnEntrAprvGbCd === "02",
    isrnEntrSuccess: isrnEntrAprvGbCd === "03",
  };
};
