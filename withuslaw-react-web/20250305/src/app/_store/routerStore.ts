import { atom } from "jotai";

type TRouterAtom = {
  prevPage: string;
};

const initValue = {
  prevPage: "",
};

const routerPath = atom<TRouterAtom>(initValue);
const routerAtom = atom(
  (get) => get(routerPath),
  (get, set, value: TRouterAtom) => {
    set(routerPath, value);
  }
);

export { routerAtom };
