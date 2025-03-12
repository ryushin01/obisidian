import { Typography } from "@components/common";

export default function RegistrationTable() {
  const isMobile = sessionStorage.getItem("isMobile");

  return (
    <>
      <div className="flex flex-col gap-20">
        <div className="_flat-table-wrapper">
          <table className="_flat-table">
            <caption className="_hidden-table-caption">플랫 테이블</caption>
            <tbody>
            <tr>
              <th>
                <Typography
                  kind={!!isMobile ? "body-small" : "body-large"}
                  isBold={true}>의뢰번호</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={!!isMobile ? "body-small" : "body-large"}>2410150001</Typography>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="_flat-table-wrapper">
          <table className="_flat-table">
            <caption className="_hidden-table-caption">플랫 테이블</caption>
            <tbody>
            <tr>
              <th>
                <Typography kind={!!isMobile ? "body-small" : "body-large"} isBold={true}>법무대리인</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={!!isMobile ? "body-small" : "body-large"}>-</Typography>
              </td>
            </tr>
            <tr>
              <th>
                <Typography kind={!!isMobile ? "body-small" : "body-large"} isBold={true}>시스템 관리자</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={!!isMobile ? "body-small" : "body-large"}>김뱅클 (02-245-6785)</Typography>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="_flat-table-wrapper">
          <table className="_flat-table">
            <caption className="_hidden-table-caption">플랫 테이블</caption>
            <tbody>
            <tr>
              <th>
                <Typography kind={!!isMobile ? "body-small" : "body-large"} isBold={true}>의뢰번호</Typography>
              </th>
              <td>
                <Typography kind={!!isMobile ? "body-small" : "body-large"}>2410150001</Typography>
              </td>
              <th>
                <Typography kind={!!isMobile ? "body-small" : "body-large"} isBold={true}>채무자</Typography>
              </th>
              <td>
                <Typography kind={!!isMobile ? "body-small" : "body-large"}>오정학</Typography>
              </td>
            </tr>
            <tr>
              <th>
                <Typography kind={!!isMobile ? "body-small" : "body-large"} isBold={true}>설정약정인</Typography>
              </th>
              <td>
                <Typography kind={!!isMobile ? "body-small" : "body-large"}>2024-09-30</Typography>
              </td>
              <th>
                <Typography kind={!!isMobile ? "body-small" : "body-large"} isBold={true}>대출실행일</Typography>
              </th>
              <td>
                <Typography kind={!!isMobile ? "body-small" : "body-large"}>2024-11-01</Typography>
              </td>
            </tr>
            <tr>
              <th>
                <Typography kind={!!isMobile ? "body-small" : "body-large"} isBold={true}>법무대리인</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={!!isMobile ? "body-small" : "body-large"}>홍길동법무법인 (02-245-6785)</Typography>
              </td>
            </tr>
            <tr>
              <th>
                <Typography kind={!!isMobile ? "body-small" : "body-large"} isBold={true}>시스템 관리자</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={!!isMobile ? "body-small" : "body-large"}>김뱅클 (02-245-6785)</Typography>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}