import { Typography } from "@components/common";
import { useResponsive } from "@hooks";
import "@styles/responsive-table.css";

export default function RegistrationStratus() {
  const [isMobile] = useResponsive();

  return (
    <div className="_responsive-table-inner-wrapper _has-thead">
      <table className="_responsive-table _col-5-type">
        <caption className="_hidden-table-caption">실시간 등기현황 표</caption>
        <thead>
        <tr>
          <th>
            <Typography
              kind={isMobile ? "body-medium" : "title-medium"}
              isBold={true}
            >
              의뢰번호
            </Typography>
          </th>
          <th>
            <Typography
              kind={isMobile ? "body-medium" : "title-medium"}
              isBold={true}
            >
              채무자
            </Typography>
          </th>
          <th>
            <Typography
              kind={isMobile ? "body-medium" : "title-medium"}
              isBold={true}
            >
              법무대리인
            </Typography>
          </th>
          <th>
            <Typography
              kind={isMobile ? "body-medium" : "title-medium"}
              isBold={true}
            >
              진행상태
            </Typography>
          </th>
          <th>
            <Typography
              kind={isMobile ? "body-medium" : "title-medium"}
              isBold={true}
            >
              등기접수번호
            </Typography>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              2410140001
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              오정학
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              홍길동 법무법인
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              대출실행
            </Typography>
          </td>
          <td>
            <button type="button">-</button>
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
              오정학
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              홍길동 법무법인
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              접수완료
            </Typography>
          </td>
          <td>
            <button type="button">123456</button>
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
              오정학
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              홍길동 법무법인
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              접수완료
            </Typography>
          </td>
          <td>
            <button type="button">123456</button>
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
              오정학
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              홍길동 법무법인
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              접수완료
            </Typography>
          </td>
          <td>
            <button type="button">123456</button>
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
              오정학
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              홍길동 법무법인
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              접수완료
            </Typography>
          </td>
          <td>
            <button type="button">123456</button>
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
              오정학
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              홍길동 법무법인
            </Typography>
          </td>
          <td>
            <Typography kind={isMobile ? "body-medium" : "title-medium"}>
              접수완료
            </Typography>
          </td>
          <td>
            <button type="button">123456</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}
