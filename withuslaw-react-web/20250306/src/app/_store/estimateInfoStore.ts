import { atomWithStorage, createJSONStorage } from "jotai/utils";

const DisRtInfo = {
  baseDate: "",
  disctRt: "",
};

const BankInfo = {
  bankNm: "",
  acct: "",
  reptMembNm: "",
};

const userInfo = {
  dbtrNm: "",
  lndThngAddr: "",
  loanNo: "",
  slPrc: "",
};

const estmInfo = {
  infoTtl: "",
  ptupCnts: "",
};

const custInfo = {
  statCd: "00",
};

const initValue: TEstimateList = {
  loanNo: "",
  searchBndDisRt: DisRtInfo,
  searchCustBankInfo: BankInfo,
  searchDbtrInfo: userInfo,
  searchCustEstmInfo: estmInfo,
  searchEstmInfoAndCustInfo: custInfo,
  searchMembInfo: [],
};

const storage = createJSONStorage<TEstimateList>(() => sessionStorage);
const estmInfoAtom = atomWithStorage<TEstimateList>(
  "estimateList",
  initValue,
  storage
);

export { estmInfoAtom };
