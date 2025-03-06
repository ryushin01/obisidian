// atoms.ts
import { atom } from "jotai";

export type AcctVerfReqCvo = {
  bankCd: string;
  acctNo: string;
  bankNm: string;
  acctDsc: string;
};

export const infoCntrAtom = atom<AcctVerfReqCvo[]>([
  {
    bankCd: "",
    acctNo: "",
    bankNm: "",
    acctDsc: "01",
  },
]);
