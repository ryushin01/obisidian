"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { KoserLogo } from "@logos";
import { AD_ASSIGN, FI_HOME_PATH } from "@constants/path";
import HeaderRightArea from "./HeaderRightArea";

/**
 * @name Header
 * @version 1.1.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function Header() {
  const [location, setLocation] = useState("");
  const pathname = usePathname();

  const checkMemberCode = (pathname: string) => {
    if (pathname === "/") {
      setLocation("");
    } else if (pathname.includes("financial")) {
      setLocation(FI_HOME_PATH);
    } else if (pathname.includes("admin")) {
      setLocation(AD_ASSIGN);
    } else {
      // TODO: 법무대리인 폴더 트리 생성 이후 로직 추가
      console.log("법무대리인");
    }
  };

  useEffect(() => {
    checkMemberCode(pathname);
  }, [pathname]);

  return (
    <header className="_header">
      <div className="_header-inner-wrap">
        <h1 className={pathname === "/" ? "_login" : ""}>
          <Link href={location}>
            <Image src={KoserLogo} alt="전자등기 관리 시스템 로고" fill />
          </Link>
        </h1>

        {pathname !== "/" &&
          <HeaderRightArea />
        }
      </div>
    </header>
  );
}