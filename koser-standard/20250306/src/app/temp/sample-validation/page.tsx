import { idRegExp, passwordRegExp } from "@utils/regExpUtil";

export default function SampleValidation() {
  const sampleId = "zero.ryushin@bankle.co.kr";
  const samplePassword = "test1!";

  if (!(idRegExp.test(sampleId) && passwordRegExp.test(samplePassword))) {
    console.log("아이디 또는 패스워드 유효성 검증 실패");
  }

  return (
    <></>
  );
}
