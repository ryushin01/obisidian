/**
 * @name DrawerContent
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function DrawerContent() {
  return (
    <div className="_drawer-content">
      <span>홍길동(관리자)</span>
      <button type="button" onClick={() => console.log("비밀번호 변경")}>비밀번호 변경</button>
      <button type="button" onClick={() => console.log("로그아웃")}>로그아웃</button>
    </div>
  );
};
