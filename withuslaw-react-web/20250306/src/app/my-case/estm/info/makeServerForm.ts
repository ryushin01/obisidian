/**
 * statCd : 상태값
 * clientForm : 서버에 보낼 데이터
 */
export default function makeSeverForm({
  statCd,
  clientForm,
}: {
  statCd: string;
  clientForm: any;
}) {
  let serverForm: TObj = {};
  const formKeys = [
    "loanNo",
    "bizNo",
    "memo",
    "mvLwyrMembNo",
    "totalTax",
    "totalAmount",
    "schdTm",
  ];
  const numberKeys = [
    "registTax",
    "localEduTax",
    "specialTax",
    "stampTax",
    "rgstrReqFee",
    "ntnlHsngFnd",
    "dscntRtAmount",
    "fee",
    "vat",
    "totalAmount",
    "totalTax",
  ];

  for (const [key, value] of Object.entries(clientForm)) {
    if (formKeys.includes(key)) {
      if (
        (statCd === "01" || statCd === "80") &&
        (value === null || typeof value === "string")
      ) {
        serverForm[key] = "";
      } else {
        serverForm[key] = String(value);
      }
    }

    if (numberKeys.includes(key) && typeof value === "string") {
      if (
        (statCd === "01" || statCd === "80") &&
        (value === null || value.trim() === "")
      ) {
        serverForm[key] = 0;
      } else {
        const numberValue = parseInt(value.replaceAll(",", ""));
        serverForm[key] = isNaN(numberValue) ? "0" : numberValue;
      }
    }
  }

  serverForm.statCd = statCd;
  console.log("@@@@@@@@@@ 서버 폼이야 @@@@@@@@@@", serverForm);
  return serverForm;
}
