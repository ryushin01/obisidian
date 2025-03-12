import Image from "next/image";
import { AlertTriangleIcon } from "@icons20";
import Typography from "@components/common/Typography";

export default function SampleTable() {
  return (
    <>
      <div className="flex flex-col gap-20 p-5">
        <div className="_responsive-table-wrapper">
          <table className="_responsive-table _col-2-type">
            <caption className="_hidden-table-caption">2컬럼 테이블</caption>
            <thead>
            <tr>
              <th>
                <Typography kind="title-medium">공지사항 내용</Typography>
              </th>
              <th>
                <Typography kind="title-medium">등록일</Typography>
              </th>
            </tr>
            </thead>
            <tbody>

            {/* TODO: 긴급점검 케이스의 경우 아이콘 삽입과 스타일링을 위한 분기 처리 필요 */}
            <tr className="_emergency">
              <th>
                <span className="_table-content-wrapper">
                  <Image src={AlertTriangleIcon} alt="긴급점검 아이콘" width={20} height={20} />
                  <Typography kind="title-medium">[긴급점검] 12월 26일 전자등기 시스템</Typography>
                </span>
              </th>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">2410140003</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="_responsive-table-wrapper">
          <table className="_responsive-table _col-7-type">
            <caption className="_hidden-table-caption">7컬럼 테이블</caption>
            <thead>
            <tr>
              <th>
                <Typography kind="title-medium">의뢰번호</Typography>
              </th>
              <th>
                <Typography kind="title-medium">의뢰일</Typography>
              </th>
              <th>
                <Typography kind="title-medium">대출실행일</Typography>
              </th>
              <th>
                <Typography kind="title-medium">진행상태</Typography>
              </th>
              <th>
                <Typography kind="title-medium">채무자</Typography>
              </th>
              <th>
                <Typography kind="title-medium">등기자료</Typography>
              </th>
              <th>
                <Typography kind="title-medium">등기접수증</Typography>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17</Typography>
              </td>
              <td>
                <Typography kind="title-medium">배정완료</Typography>
              </td>
              <td>
                <Typography kind="title-medium">오정학</Typography>
              </td>
              <td>
                <button type="button">등기자료</button>
              </td>
              <td>
                <button type="button">등기접수증</button>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17</Typography>
              </td>
              <td>
                <Typography kind="title-medium">미배정</Typography>
              </td>
              <td>
                <Typography kind="title-medium">오정학</Typography>
              </td>
              <td>
                <button type="button">등기자료</button>
              </td>
              <td>
                <button type="button">등기접수증</button>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">2410140003</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17</Typography>
              </td>
              <td>
                <Typography kind="title-medium">접수완료 [55384, 55385]</Typography>
              </td>
              <td>
                <Typography kind="title-medium">오정학</Typography>
              </td>
              <td>
                <button type="button">등기자료</button>
              </td>
              <td>
                <button type="button">등기접수증</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="_responsive-table-wrapper">
          <table className="_responsive-table _col-5-type">
            <caption className="_hidden-table-caption">5컬럼 테이블</caption>
            <thead>
            <tr>
              <th>
                <Typography kind="title-medium">의뢰번호</Typography>
              </th>
              <th>
                <Typography kind="title-medium">대출실행일</Typography>
              </th>
              <th>
                <Typography kind="title-medium">의뢰일시</Typography>
              </th>
              <th>
                <Typography kind="title-medium">진행상태</Typography>
              </th>
              <th>
                <Typography kind="title-medium">등기자료</Typography>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2025-3-10</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17 15:30:15</Typography>
              </td>
              <td>
                <Typography kind="title-medium">등기의뢰</Typography>
              </td>
              <td>
                <button type="button">등기자료</button>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2025-3-10</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17 15:30:15</Typography>
              </td>
              <td>
                <Typography kind="title-medium">등기의뢰</Typography>
              </td>
              <td>
                <button type="button">등기자료</button>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2025-3-10</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17 15:30:15</Typography>
              </td>
              <td>
                <Typography kind="title-medium">등기의뢰</Typography>
              </td>
              <td>
                <button type="button">등기자료</button>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2025-3-10</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17 15:30:15</Typography>
              </td>
              <td>
                <Typography kind="title-medium">등기의뢰</Typography>
              </td>
              <td>
                <button type="button">등기자료</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="_responsive-table-wrapper">
          <table className="_responsive-table _col-6-type">
            <caption className="_hidden-table-caption">6컬럼 테이블</caption>
            <thead>
            <tr>
              <th>
                <Typography kind="title-medium">진행상태</Typography>
              </th>
              <th>
                <Typography kind="title-medium">의뢰번호</Typography>
              </th>
              <th>
                <Typography kind="title-medium">대출실행일</Typography>
              </th>
              <th>
                <Typography kind="title-medium">의뢰자</Typography>
              </th>
              <th>
                <Typography kind="title-medium">의뢰일시</Typography>
              </th>
              <th>
                <Typography kind="title-medium">배정</Typography>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>
                <Typography kind="title-medium">등기의뢰</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
              <td>
                <Typography kind="title-medium">성북신협</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17 15:30:15</Typography>
              </td>
              <td>
                <button type="button">배정</button>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">등기의뢰</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
              <td>
                <Typography kind="title-medium">성북신협</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17 15:30:15</Typography>
              </td>
              <td>
                <button type="button">배정</button>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">등기의뢰</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
              <td>
                <Typography kind="title-medium">성북신협</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17 15:30:15</Typography>
              </td>
              <td>
                <button type="button">배정</button>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">등기의뢰</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
              <td>
                <Typography kind="title-medium">성북신협</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17 15:30:15</Typography>
              </td>
              <td>
                <button type="button">배정</button>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">등기의뢰</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
              <td>
                <Typography kind="title-medium">성북신협</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17 15:30:15</Typography>
              </td>
              <td>
                <button type="button">배정</button>
              </td>
            </tr>
            <tr>
              <td>
                <Typography kind="title-medium">등기의뢰</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2410140001</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-25</Typography>
              </td>
              <td>
                <Typography kind="title-medium">성북신협</Typography>
              </td>
              <td>
                <Typography kind="title-medium">2024-12-17 15:30:15</Typography>
              </td>
              <td>
                <button type="button">배정</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
