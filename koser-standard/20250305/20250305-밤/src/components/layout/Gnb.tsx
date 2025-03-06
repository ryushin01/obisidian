"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MENU_LIST } from "@constants/menu";

/**
 * @name Gnb
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function Gnb() {
  const pathname = usePathname();

  return (
    <nav className="_gnb">
      <ul>
        {MENU_LIST.map((menu) => {
          const { id, name, path } = menu;

          return (
            <li key={id} className={path === pathname ? "_selected" : undefined}>
              <Link href={path}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}