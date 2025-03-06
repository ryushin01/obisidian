/**
 * 01: 이전
 * 02: 설정
 * 03: 말소
 */
const RGSTR_GB_CD = {
  "01": "01",
  "02": "02",
  "03": "03",
};
type RGSTR_GB_CD = (typeof RGSTR_GB_CD)[keyof typeof RGSTR_GB_CD];

const RGSTR_TEXT: TObj = {
  "01": "이전",
  "02": "설정",
  "03": "말소",
};
type RGSTR_TEXT = (typeof RGSTR_TEXT)[keyof typeof RGSTR_TEXT];

const CntrGb = {
  PROG: "PROG",
  DONE: "DONE",
} as const;
type CntrGb = (typeof CntrGb)[keyof typeof CntrGb];

// 0 : 은행, 1 : 저축은행, 2 : 증권사, 3 : 카드사&캐피탈, 4 : 보험사
const BankTypeCode = {
  BANK: "0",
  SAVE: "1",
  STOCK: "2",
  CARD_CAPITAL: "3",
  INSURANCE: "4",
  ETC: "ETC",
} as const;
type BankTypeCode = (typeof BankTypeCode)[keyof typeof BankTypeCode];

const KndCd: TObj = {
  "1": "buyAndSell",
  "2": "jeonse",
  "3": "jadam",
  "4": "leejoobi",
  "5": "leejoobi",
  "6": "balanceOfMoveIn",
} as const;
type KndCd = (typeof KndCd)[keyof typeof KndCd];

const AddInfo = {
  CMMS_ACCT: "cmmsAcctYn",
  ELREG_ID: "elregIdYn",
  PROFI_IMG: "profiImgYn",
  ISRN_ENTR: "isrnEntrAprvGbCd",
};
type AddInfo = (typeof AddInfo)[keyof typeof AddInfo];

// flutterFunc
const FLUTTER_FUNC_MODE = {
  IMAGE: "IMAGE",
  IMAGE_VIEW: "IMAGE_VIEW",
};
type FLUTTER_FUNC_MODE =
  (typeof FLUTTER_FUNC_MODE)[keyof typeof FLUTTER_FUNC_MODE];
const WK_CD = {
  IMAGE_BIZ: "IMAGE_BIZ",
  IMAGE_CUST: "IMAGE_CUST",
};
type WK_CD = (typeof WK_CD)[keyof typeof WK_CD];
const ATTC_FIL_CD = {
  /** 등기신청파일 */
  "01": "01",
  /** 프로필사진 */
  "03": "03",
  /** 전시콘텐츠파일 */
  "04": "04",
  /** 배너콘텐츠파일 */
  "05": "05",
  /** 사업자등록증 */
  "06": "06",
  /** 보험가입증명서 */
  "07": "07",
  /** 매매계약서 */
  "08": "08",
  /** 소유권이전서류 */
  "1": "1",
  /** 상환영수증당행 */
  "2": "2",
  /** 상환영수증타행 */
  "3": "3",
  /** 설정계약서 */
  "4": "4",
  /** 등기부등본 */
  "5": "5",
  /** 잔금완납영수증 */
  "6": "6",
  /** 등기접수증 */
  "7": "7",
  /** 등기필증 */
  "8": "8",
  /** 주민등록등본 */
  A: "A",
  /** 전입세대열람 */
  B: "B",
  /** 수정임대차계약서 */
  C: "C",
  /** 세금계약서 */
  E: "E",
  /** 소유자주민등록초본(이전등기) */
  F: "F",
  /** 등기필증(이전등기) */
  G: "G",
};
type ATTC_FIL_CD = (typeof ATTC_FIL_CD)[keyof typeof ATTC_FIL_CD];

export {
  CntrGb,
  BankTypeCode,
  KndCd,
  AddInfo,
  RGSTR_GB_CD,
  RGSTR_TEXT,
  FLUTTER_FUNC_MODE,
  ATTC_FIL_CD,
  WK_CD,
};
