import { atom } from "jotai";

type TAction = {
  type?: "reset";
  value?: string;
};

const keywordAtom = atom("");
const keywordStore = atom(
  (get) => get(keywordAtom),
  (get, set, action: TAction) => {
    if (action.type === "reset") {
      set(keywordAtom, "");
      return;
    }
    set(keywordAtom, action.value ?? "");
    // you can set as many atoms as you want at the same time
  }
);

export { keywordStore };
