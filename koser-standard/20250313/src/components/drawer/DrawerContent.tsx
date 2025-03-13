import Image from "next/image";
import { FinanceEmblemMedium } from "@logos";
import { LogoutIcon } from "@icons14";
import { Typography } from "@components/common";
import { Button } from "@components/button";

/**
 * @name DrawerContent
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function DrawerContent() {
  // 임시 권한 구분 코드(1: 금융기관 / 2: 법무대리인 / 3: 관리자)
  const level: number = 3;

  return (
    <div className="_drawer-content">

      {/* NOTE: 금융기관(신협) 케이스에서만 노출 */}
      {level === 1 && (
        <div className="_drawer-content-inner-wrapper">
          <Image src={FinanceEmblemMedium} alt="신협 로고" width={48} height={48} />
          <Typography kind="body-large" isBold={true}>성북신협</Typography>
        </div>
      )}

      <div className="_drawer-content-inner-wrapper">
        <Button
          shape="solid"
          size="sm"
          color="main5"
          onClick={() => console.log("비밀번호 변경")}>
          비밀번호 변경
        </Button>

        <Button
          shape="outline"
          size="sm"
          color="grayscale"
          icon={
            <Image
              src={LogoutIcon}
              alt="로그아웃 아이콘"
              width={14}
              height={14}
            />
          }
          iconPosition="right"
          onClick={() => console.log("로그아웃")}>
          로그아웃
        </Button>
      </div>
    </div>
  );
};
