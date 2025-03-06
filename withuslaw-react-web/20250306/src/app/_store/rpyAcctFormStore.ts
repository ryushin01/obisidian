import { atomWithStorage, createJSONStorage } from "jotai/utils";

type TBankInfo = {
  bankNm: string;
  bankCd: string;
  acctNo: string;
};
type TRpyAcctForm = { woori: string; bankList: TBankInfo[] };

const initValue: TRpyAcctForm = {
  woori: "",
  bankList: [
    {
      bankCd: "",
      acctNo: "",
      bankNm: "",
    },
  ],
};

const storage = createJSONStorage<TRpyAcctForm>(() => sessionStorage);
const rpyAcctFormAtom = atomWithStorage<TRpyAcctForm>(
  "rpayAcct",
  initValue,
  storage
);

export { rpyAcctFormAtom };
