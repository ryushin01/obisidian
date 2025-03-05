import { atomWithStorage, createJSONStorage } from "jotai/utils";

type TAuthAtom = {
  membNo: string;
  membNm: string;
  reptMembNo: string;
  reptMembNm: string;
  bizNo: string;
  officeNm: string;
  profileImgPath: string;
  accessToken: string;
  refreshToken: string;
  isRept: boolean;
  permCd: string;
  dvceUnqNum: string;
};

const initValue: TAuthAtom = {
  membNo: "",
  membNm: "",
  reptMembNo: "",
  reptMembNm: "",
  bizNo: "",
  officeNm: "",
  profileImgPath: "",
  permCd: "",
  accessToken: "",
  refreshToken: "",
  isRept: false,
  dvceUnqNum: "",
};

const storage = createJSONStorage<TAuthAtom>(() => sessionStorage);
const authAtom = atomWithStorage<TAuthAtom>("auth", initValue, storage);

export { authAtom };
