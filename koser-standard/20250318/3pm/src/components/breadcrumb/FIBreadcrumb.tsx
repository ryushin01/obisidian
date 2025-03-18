"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon, RightArrowIcon } from "@icons14";
import { FI_HOME_PATH } from "@constants/path";
import { Typography } from "@components/common";
import "@styles/breadcrumb.css";

type PathListProps = {
  [key: string]: string
}

export const PATH_LIST: PathListProps = {
  "notice": "공지사항",
  "request-list": "의뢰목록",
  "request": "전자등기 의뢰",
  "status-inquiry": "현황조회",
};

/**
 * @name FIBreadcrumb
 * @version 1.1.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 * @description 금융기관 전용 컴포넌트입니다.
 */
export default function FIBreadcrumb() {
  const pathname = usePathname();
  const condition = pathname.split("/").slice(2)[0];
  const location = pathname.split("/").slice(1, 3).join("/");
  let pathArray: string[];

  if (condition === "home") {
    pathArray = pathname.split("/").slice(-1);
  } else {
    pathArray = pathname.split("/").slice(2);
  }

  return (
    <ol className="_breadcrumb">
      <li>
        <Link href={FI_HOME_PATH}>
          <Image src={HomeIcon} alt="홈 아이콘" width={14} height={14} />
          <Typography kind="body-medium">홈</Typography>
        </Link>
      </li>

      {pathArray.map((path, index) => {
        return (
          <li key={path}>
            <Link href={pathArray.length - 1 !== index ? `/${location}` : ""}>
              <Image src={RightArrowIcon} alt="우측 화살표 아이콘" width={14} height={14} />
              <Typography kind="body-medium">{PATH_LIST[path]}</Typography>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
