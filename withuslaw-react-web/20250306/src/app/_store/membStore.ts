import { atomWithStorage, createJSONStorage } from "jotai/utils";

type TMembAtom = {
  loanNo: string;
  dbtrNm: string;
  dbtrHpno: string;
  dbtrBirthDt: string;
  lndThngAddr: string;
  lndPrdNm: string;
  rrcpSbmtYn: string;
  mvhhdSbmtYn: string;
  rtalSbmtYn: string;
  reptMembNm: string;
};

const initValue: TMembAtom = {
  loanNo: "",
  dbtrNm: "",
  dbtrHpno: "",
  dbtrBirthDt: "",
  lndThngAddr: "",
  lndPrdNm: "",
  rrcpSbmtYn: "",
  mvhhdSbmtYn: "",
  rtalSbmtYn: "",
  reptMembNm: "",
};

const storage = createJSONStorage<TMembAtom>(() => sessionStorage);
const membAtom = atomWithStorage<TMembAtom>("membData", initValue, storage);

export { membAtom };
