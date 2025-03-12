"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { HomeIcon, RightArrowIcon } from "@icons14";
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
 * @name Breadcrumb
 * @version 1.0.0
 * @author 류창선 <zero.ryushin@bankle.co.kr>
 */
export default function Breadcrumb() {
  // const [pathArray, setPathArray] = useState<string[]>([]);
  const path = usePathname();
  const condition = path.split("/").slice(1)[0];
  let pathArray: string[];

  if (condition === "home") {
    pathArray = path.split("/").slice(-1);
  } else {
    pathArray = path.split("/").slice(1);
  }

  return (
    <ol className="_breadcrumb">
      <li>
        <Link href="/home">
          <Image src={HomeIcon} alt="홈 아이콘" width={14} height={14} />
          <Typography kind="body-medium">홈</Typography>
        </Link>
      </li>

      {pathArray.map((path, index) => {
        return (
          <li key={path}>
            <Link href={pathArray.length - 1 !== index ? `/${path}` : ""}>
              <Image src={RightArrowIcon} alt="우측 화살표 아이콘" width={14} height={14} />
              <Typography kind="body-medium">{PATH_LIST[path]}</Typography>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
