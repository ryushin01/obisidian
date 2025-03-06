interface IAcctVerfRegCvos {
  bankCd: string;
  acctNo: string;
  bankNm: string;
  acctDsc: string; // 01:상환금계좌,02:수수료계좌
}
type TModifyAcctNo = Omit<IAcctVerfRegCvos, "acctDsc" | "bankNm">;
