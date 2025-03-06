import { TFilterBody } from "@app/my-case/page";
import { atom } from "jotai";

const init = {
  startDate: "",
  endDate: "",
  regType: "",
};

const myCaseFilter = atom<TFilterBody>(init);
const myCaseFilterStore = atom(
  (get) => get(myCaseFilter),
  (get, set, value: TFilterBody) => {
    set(myCaseFilter, value);
  }
);

export { myCaseFilterStore };
