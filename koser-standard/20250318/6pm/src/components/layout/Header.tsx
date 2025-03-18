"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { KoserLogo } from "@logos";
import HeaderRightArea from "./HeaderRightArea";

/**
 * @name Header
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="_header">
      <div className="_header-inner-wrap">
        <h1 className={pathname === "/" ? "_login" : ""}>
          <Image src={KoserLogo} alt="전자등기 관리 시스템 로고" fill />
        </h1>

        {pathname !== "/" &&
          <HeaderRightArea />
        }
      </div>
    </header>
  );
}