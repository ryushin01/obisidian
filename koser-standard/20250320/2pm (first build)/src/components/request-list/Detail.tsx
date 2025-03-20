import { Typography } from "@components/common";
import { Button } from "@components/button";
import { ResponsiveType } from "@types";

export default function Detail({ isMobile }: ResponsiveType) {
  return (
    <>
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
              <td colSpan={3}>
                <Typography kind={isMobile ? "body-small" : "body-large"}>2410150001</Typography>
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

      {/* 보완요청 사유 */}
      <section className="_section">
        <Typography as="h2" kind={isMobile ? "body-large" : "title-medium"} isBold={true} className="_title _point">보완요청
          사유</Typography>
        <div className="_notice">
          <Typography as="p" kind={isMobile ? "body-small" : "body-large"}>전체 페이지가 모두 등록되지 않았습니다. 등기자료를 다시 등록해
            주세요.</Typography>
        </div>
      </section>

      {/* CTA 버튼 영역 */}
      <section className="_section">
        <div className="_button-wrap">
          <Button
            shape="solid"
            size="md"
            color="grayscale"
            onClick={() => console.log("진행보류")}>
            진행보류
          </Button>

          <Button
            shape="solid"
            size="md"
            color="main100"
            onClick={() => console.log("다시 제출하기")}>
            다시 제출하기
          </Button>
        </div>
      </section>
    </>
  );
}