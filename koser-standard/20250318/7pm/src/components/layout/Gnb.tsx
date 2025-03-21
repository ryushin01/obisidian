"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FI_MENU_LIST, AD_MENU_LIST } from "@constants/menu";
import Typography from "@components/common/Typography";
import { useResponsive } from "@hooks";

/**
 * @name Gnb
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function Gnb() {
  const pathname = usePathname();
  const [isMobile] = useResponsive();

  return (
    <nav className={`_gnb ${pathname.includes("/admin") ? "_admin" : ""}`}>
      <ul>
        {(pathname.includes("/admin") ? AD_MENU_LIST : FI_MENU_LIST).map((menu) => {
          const { id, name, path, defaultIcon, selectedIcon } = menu;

          return (
            <li key={id} className={pathname.includes(path) ? "_selected" : undefined}>
              <Link href={path}>
                <span className="_menu-item-inner-wrapper">
                  {(defaultIcon && selectedIcon) &&
                    <Image
                      src={!isMobile ?
                        (pathname.includes(path) ? selectedIcon! : defaultIcon!) : (selectedIcon!)}
                      alt={`${name} 메뉴 ${pathname.includes(path) ? "선택" : "선택 해제"}`}
                      width={24}
                      height={24}
                    />
                  }
                  <Typography
                    kind={isMobile ? "caption-small" : "title-medium"}>
                    {name}
                  </Typography>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}