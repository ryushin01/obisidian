"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MENU_LIST } from "@constants/menu";
import Typography from "@components/common/Typography";

/**
 * @name Gnb
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function Gnb() {
  const pathname = usePathname();
  const isMobile = sessionStorage.getItem("isMobile");

  return (
    <nav className="_gnb">
      <ul>
        {MENU_LIST.map((menu) => {
          const { id, name, path } = menu;

          return (
            <li key={id} className={pathname.includes(path) ? "_selected" : undefined}>
              <Link href={path}>
                {!isMobile && <Typography kind={"title-medium"} isBold={true}>{name}</Typography>}

                {isMobile && <Typography kind={"caption-small"} isBold={false}>{name}</Typography>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}