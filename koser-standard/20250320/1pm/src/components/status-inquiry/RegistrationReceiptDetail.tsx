import { Typography } from "@components/common";
import { ResponsiveType } from "@types";

export default function RegistrationReceiptDetail({ isMobile }: ResponsiveType) {
  return (
    <>
      {/* 담보목적물 주소 */}
      <section className="_section">
        <Typography as="h2" kind={isMobile ? "body-large" : "title-medium"} isBold={true} className="_title">담보목적물
          주소</Typography>
        <div className="_responsive-table-inner-wrapper _no-thead">
          <table className="_responsive-table">
            <caption className="_hidden-table-caption">담보목적물 주소 표</caption>
            <tbody>
            <tr>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>지번</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={isMobile ? "body-small" : "body-large"}>서울특별시 동대문구 장안동 367-5</Typography>
              </td>
            </tr>
            <tr>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>도로명</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={isMobile ? "body-small" : "body-large"}>서울특별시 동대문구 장한로26가길 6</Typography>
              </td>
            </tr>
            <tr>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>상세주소</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={isMobile ? "body-small" : "body-large"}>107동 303호</Typography>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 기본 정보 */}
      <section className="_section">
        <Typography as="h2" kind={isMobile ? "body-large" : "title-medium"} isBold={true} className="_title">기본
          정보</Typography>
        <div className="_responsive-table-inner-wrapper _no-thead">
          <table className="_responsive-table">
            <caption className="_hidden-table-caption">기본 정보 표</caption>
            <tbody>
            <tr>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>의뢰번호</Typography>
              </th>
              <td>
                <Typography kind={isMobile ? "body-small" : "body-large"}>2410150001</Typography>
              </td>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>채무자</Typography>
              </th>
              <td>
                <Typography kind={isMobile ? "body-small" : "body-large"}>오정학</Typography>
              </td>
            </tr>
            <tr>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>설정약정일</Typography>
              </th>
              <td>
                <Typography kind={isMobile ? "body-small" : "body-large"}>2024-09-30</Typography>
              </td>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>대출실행일</Typography>
              </th>
              <td>
                <Typography kind={isMobile ? "body-small" : "body-large"}>2024-11-01</Typography>
              </td>
            </tr>
            <tr>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>채권최고액</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={isMobile ? "body-small" : "body-large"}>149,600,000 원</Typography>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 등기접수 정보 */}
      <section className="_section">
        <Typography as="h2" kind={isMobile ? "body-large" : "title-medium"} isBold={true} className="_title">등기접수
          정보</Typography>
        <div className="_responsive-table-inner-wrapper _no-thead">
          <table className="_responsive-table">
            <caption className="_hidden-table-caption">등기접수 정보 표</caption>
            <tbody>
            <tr>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>관할법원</Typography>
              </th>
              <td>
                <Typography kind={isMobile ? "body-small" : "body-large"}>광주지방법원</Typography>
              </td>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>등기소</Typography>
              </th>
              <td>
                <Typography kind={isMobile ? "body-small" : "body-large"}>무안등기소</Typography>
              </td>
            </tr>
            <tr>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>접수번호</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={isMobile ? "body-small" : "body-large"}>45360</Typography>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 담당자 정보 */}
      <section className="_section">
        <Typography as="h2" kind={isMobile ? "body-large" : "title-medium"} isBold={true} className="_title">담당자
          정보</Typography>
        <div className="_responsive-table-inner-wrapper _no-thead">
          <table className="_responsive-table">
            <caption className="_hidden-table-caption">담당자 정보 표</caption>
            <tbody>
            <tr>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>법무대리인</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={isMobile ? "body-small" : "body-large"}>-</Typography>
              </td>
            </tr>
            <tr>
              <th>
                <Typography
                  kind={isMobile ? "body-small" : "body-large"}
                  isBold={true}>시스템 관리자</Typography>
              </th>
              <td colSpan={3}>
                <Typography kind={isMobile ? "body-small" : "body-large"}>김뱅클 (02-245-6785)</Typography>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}