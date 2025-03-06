import { CntrGb } from "@constants";
import { atom } from "jotai";

const myCaseCntrGb = atom<CntrGb>(CntrGb.PROG);
const myCaseCntrGbStore = atom(
  (get) => get(myCaseCntrGb),
  (get, set, value: CntrGb) => {
    set(myCaseCntrGb, value);
  }
);

export { myCaseCntrGbStore };
