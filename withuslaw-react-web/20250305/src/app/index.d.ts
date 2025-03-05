type TData<T> = {
  code: string;
  msg: string;
  data: T;
};

type TObj = {
  [key: string]: any;
};

type TCaseDetailResData = {
  resData: boolean;
  title: string | null;
  body: string | null;
};

type TPrevProg = {
  progGbCd: string;
  progGbNum: string;
  progGbNm: string;
  progDesc: string;
  viewYn: string;
};
type TDetailInfo = {
  rgstrGbCd: string | null;
  regType: string | null;
  bnkBranchCd: string;
  bnkBranchNm: null | string;
  bnkBrnchPhno: null | string;
  orgBrnchNm: null | string;
  clsBtnYn: string;
  crtDtm: string;
  dbtrBirthDt: string;
  dbtrHpno: string;
  dbtrNm: string;
  elregBizNo: null | string;
  elregReptOfficeNm: null | string;
  elregOfficeTelNo: null | string;
  execAmt: number;
  execDt: string;
  kndCd: string | null;
  kndNm: string | null;
  lndPrdtNm: string;
  lndThngAddr: string;
  loanNo: string;
  slPrc: number;
  statCd: string;
  statNm: string;
  lndHndgSlfDsc: string;
  docAmt: number;
  debtDcAmt: number;
  etcAmt: number;
  slmnLndProc: string;
  slmnLndProcNm: string;
  slmnCmpyNm: string;
  slmnNm: string;
  slmnPhno: string;
  sellerNm1: string;
  sellerBirthDt1: string;
  sellerNm2: string;
  sellerBirthDt2: string;
  trstNm: string;
  cnsgnNm: string;
  bnfrNm: string;
  owshDocStatCd: string;
  owshDocStatNm: string;
  progGbInfo: {
    currProgCd: string;
    currProgNum: string;
    currProgNm: string;
    currProgDesc: string;
    nextProgCd: string;
    nextProgNum: string;
    nextProgNm: string;
    nextProgDesc: string;
    prevProgList: TPrevProg[];
  };
  resDateRfdRegd: TCaseDetailResData;
  resEltnSecurd: TCaseDetailResData;
  resEstbsCntrFn: TCaseDetailResData;
  resEstmCnfm: TCaseDetailResData;
  resEstmRegd: TCaseDetailResData;
  resExecAmtChngd: TCaseDetailResData;
  resExecDateCheck: TCaseDetailResData;
  resLndAmtPay: TCaseDetailResData;
  resPayRegd: TCaseDetailResData;
  resRevisionCheck: TCaseDetailResData;
  resRfdRegd: TCaseDetailResData;
  resRgstrRegd: TCaseDetailResData;
};

type TRgstrGbCd = "01" | "02" | "03";
type TCntrData = {
  date: string;
  rgstrGbCd: TRgstrGbCd;
  dbtrNm: string;
  lndThngAddr: string;
  loanNo: string;
  statNm: string;
  statCd: string;
  newCntrYn: string;
  lndHndgSlfDsc: string;
};
type TCntr = {
  date: string;
  cntrDataList: TCntrData[];
};
type TCntrInfo = {
  cntrCount: number;
  cntrList: TCntr[];
  newPopup: boolean;
};
type TPageData = {
  currPageNum: number;
  last: boolean;
  pageSize: number;
  totalElements: number;
  totalPageNum: number;
};
type TFillInfo = {
  bfAvail: boolean;
  endDate: string;
  erAvail: boolean;
  esAvail: boolean;
  startDate: string;
};
type TMyCaseData = {
  doneCntrInfo: TCntrInfo;
  progCntrInfo: TCntrInfo;
  pageData: TPageData;
  fillInfo: TFillInfo;
};
type defaultClientForm = {
  loanNo: string;
  statCd: string;
  bizNo: string;
  registTax: string;
  localEduTax: string;
  specialTax: string;
  stampTax: string;
  rgstrReqFee: string;
  ntnlHsngFnd: string;
  dscntRtAmount: string;
  fee: string;
  vat: string;
  membNm: string;
  mvLwyrMembNo: string;
  totalTax: number;
  totalFee: number;
  totalAmount: number;
  memo: string;
};

type TResBank = {
  chgDtm: string;
  chgMembNo: string;
  code: string;
  codeNm: string;
  crtDtm: string;
  crtMembNo: string;
  etc1: string;
  etc2: null | string;
  etc3: null | string;
  grpCd: string;
  grpDesc: string;
  grpNm: string;
  num: number;
  useYn: string;
};

type TSelectedBankObj = { [key: number]: TSelectedBank };

type TCaseData = {
  order: Key | null | undefined;
  statCd: string;
  regType: TRgstrGbCd; // 등기 구분 코드
  dbtrNm: string;
  loanNo: string;
  execPlnDt: string; // 실행일자
  dpAddr: string; // 주소
  slPrc: number; // 매매금액
};

type TCaseArgs = {
  statCd: string;
  loanNo: string;
};

type TSgg = {
  sidoNm: string;
  sidoCd: string;
  sidoNmCvt: string;
  sggNm: string;
  sggCd: string;
};

type TSido = Omit<TSgg, "sggNm", "sggCd">;

type TEstimateSaveForm = {
  loanNo: string | null;
  bizNo: string;
  statCd: string;
  registTax: string;
  localEduTax: string;
  specialTax: string;
  stampTax: string;
  rgstrReqFee: string;
  ntnlHsngFnd: string;
  dscntRtAmount: string;
  fee: string;
  vat: string;
  membNm: string;
  mvLwyrMembNm: string;
  mvLwyrMembNo: string;
  mvLwyrMembCphnNo: string;
  totalTax: number;
  totalFee: number;
  totalAmount: number;
  cphnNo: string;
  imgSeq: string;
  schdTm: string;
  schdDtm: string;
  execDtmmdd: string;
  infoTtl: string;
  memo: string;
  schdDateTime: string;
};

interface TWebviewEstimate extends TEstimateSaveForm {
  bankNm: string;
  acct: string;
  reptMembNm: string;
  mvLwyrMembCphnNo: any;
  officeNm: string;
  officeTelno: string;
  officeAddr: string;
  lndThngAddr: string;
  rdnmInclAddr: string;
  slPrc: number;
  estmRegDt: string;
  execDt: string;
  baseDate: string;
  disctRt: number;
  bfBaseDate: string;
  bfDisctRt: number;
}

type TDisc = {
  baseDate: string;
  disctRt: number;
};

type TEstimateList = {
  loanNo: string;
  searchBndDisRt: any;
  searchCustBankInfo: {
    acct: string;
    bankNm: string;
    reptMembNm: string;
  };
  searchDbtrInfo: {
    loanNo: string;
    dbtrNm: string;
    lndThngAddr: string;
    slPrc: string;
  };
  searchCustEstmInfo: {
    infoTtl: string;
    ptupCnts: string;
  };
  searchMembInfo: TSelect[];
  searchEstmInfoAndCustInfo: any;
};

interface TList extends TEstimateForm {
  totalTax: number;
  totalAmount: number;
  totalFee: number;
}

type CommonRegistInfo = {
  loanNo: string | null;
  elregId: string;
  docWriteNum: string;
};

type CommonRegistForm = {
  buyerName: string;
  buyerBirthDt: string;
  buyerNo: number;
};

type TBankList = {
  bankCd: string;
  bankNm: string;
  payAmt: string | number;
};
type TPayInfoBank = {
  no: number;
  payCd: TPayCd;
} & TBankList;
type TForm = {
  sellerPayAmt: string;
  buyerPayAmt: string;
  bankList: TBankList[];
};
type TSrSvo = {
  slmnLndProc: string;
  sellerNm1: string;
  sellerBirthDt1: string;
  sellerNm2: string;
  sellerBirthDt2: string;
  trstNm: string;
  cnsgnNm: string;
  bnfrNm: string;
  bnkGbCd: string;
  bankNm: string;
  execAmt: number;
};

type TBank = {
  bankCd: string;
  acctNo: string;
};

type TChangeFunc = (event: ChangeEvent<HTMLInputElement>) => void;
