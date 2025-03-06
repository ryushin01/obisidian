import { ToastType } from "@components/Constants";
import { atom } from "jotai";

interface IArgs {
  msg: string;
  dim?: boolean;
  status: ToastType["success" | "notice" | "error"];
  afterFunc?: any;
}
interface IAtom extends IArgs {
  isOpen: boolean;
}

const toastAtom = atom<IAtom>({
  isOpen: false,
  msg: "",
  dim: false,
  status: "error",
  afterFunc: null,
});
const toastState = atom(
  (get) => get(toastAtom),
  (get, set, state: IArgs) => {
    setTimeout(() => {
      set(toastAtom, { ...state, isOpen: false });
      if (typeof state.afterFunc === "function") {
        state.afterFunc();
      }
    }, 3000);
    set(toastAtom, { ...state, isOpen: true });
  }
);

export { toastState };
