import { atomWithStorage, createJSONStorage } from "jotai/utils";

const initValue: TEstimateSaveForm = {
  loanNo: "",
  bizNo: "",
  statCd: "00",
  registTax: "",
  localEduTax: "",
  specialTax: "",
  stampTax: "",
  rgstrReqFee: "",
  ntnlHsngFnd: "",
  dscntRtAmount: "",
  fee: "",
  vat: "",
  membNm: "",
  mvLwyrMembNo: "",
  totalTax: 0,
  totalFee: 0,
  totalAmount: 0,
  infoTtl: "",
  cphnNo: "",
  imgSeq: "",
  schdTm: "",
  schdDtm: "",
  memo: "",
  execDtmmdd: "",
  mvLwyrMembNm: "",
  mvLwyrMembCphnNo: "",
  schdDateTime: "",
};

const storage = createJSONStorage<TEstimateSaveForm>(() => sessionStorage);
const estimateSaveAtom = atomWithStorage<TEstimateSaveForm>(
  "clientForm",
  initValue,
  storage
);

export { estimateSaveAtom };
