import { atom } from "jotai";

const payRequestStore = atom({ sellerPayAmt: 0, buyerPayAmt: 0 });

export { payRequestStore };
