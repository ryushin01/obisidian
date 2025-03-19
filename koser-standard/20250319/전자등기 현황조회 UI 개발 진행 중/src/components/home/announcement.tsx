import Image from "next/image";
import { AlertTriangleIcon } from "@icons20";
import { Typography } from "@components/common";
import { useResponsive } from "@hooks";
import "@styles/responsive-table.css";

export default function Announcement() {
  const [isMobile] = useResponsive();

  return (
    <div className="_responsive-table-inner-wrapper _has-thead">
      <table className="_responsive-table _col-2-type">
        <caption className="_hidden-table-caption">공지사항 표</caption>
        <thead>
        <tr>
          <th>
            <Typography
              kind={isMobile ? "body-medium" : "title-medium"}
              isBold={true}
            >
              공지사항 내용
            </Typography>
          </th>
          <th>
            <Typography
              kind={isMobile ? "body-medium" : "title-medium"}
              isBold={true}
            >
              등록일
            </Typography>
          </th>
        </tr>
        </thead>
        <tbody>
        {/* TODO: 긴급점검 케이스의 경우 아이콘 삽입과 스타일링을 위한 분기 처리 필요 */}
        <tr className="_emergency">
          <th>
              <span className="_table-content-wrapper">
                <Image
                  src={AlertTriangleIcon}
                  alt="긴급점검 아이콘"
                  width={20}
                  height={20}
                />
                <Typography kind={isMobile ? "body-medium" : "title-medium"}>
                  [긴급점검] 12월 26일 전자등기 시스템
                </Typography>
              </span>
          </th>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2024-12-25
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2410140001
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2024-12-25
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2410140003
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2024-12-25
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2410140001
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2024-12-25
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2410140003
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2024-12-25
            </Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2410140003
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2024-12-25
            </Typography>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}
